---
title: "Kubernetes GitOps Control-Plane Internals: Desired-Subset Drift Engines, Server-Side Apply managedFields, Finalizer Ordering, and OCI Helm Pinning"
description: "Why naive Git-to-cluster JSON diffs drown in API-server defaults and blind prunes break operators—and how to build deterministic desired-subset drift engines, CAS-backed admission guards, selfHeal-safe preview teardown, and digest-pinned OCI Helm pipelines."
pubDate: "2026-11-24"
updatedDate: "2026-11-24"
tags: ["kubernetes", "gitops", "argocd", "security", "supply-chain"]
author: "Joshua Edward McLaughlin Cox"
draft: true
---

Most Kubernetes GitOps tooling behaves cleanly on day one with a stateless `Deployment` and an `Ingress`. By month six—once operators, mutating admission webhooks, HorizontalPodAutoscalers, ephemeral preview environments, and dozens of Helm charts share the control plane—naive "diff Git YAML against `kubectl get -o json` and auto-sync everything" turns into an outage generator:

1. **`kube-apiserver` defaulting floods diffs with phantom noise**: Fields omitted from Git (`terminationGracePeriodSeconds`, `dnsPolicy`, `clusterIP`, `status`, `resourceVersion`, `managedFields`) are populated by API-server admission defaults, causing naive object comparisons to flag every healthy resource as drifted.
2. **HPA and mutating sidecar webhooks fight `selfHeal: true`**: When a reconciler blindly overwrites `spec.replicas` or injected sidecar containers without respecting Server-Side Apply (`SSA`) `metadata.managedFields` ownership, GitOps and controllers enter a tight conflict loop.
3. **Preview environment teardown races `namespace-controller`**: Deleting an ephemeral preview `Namespace` while its parent ArgoCD `Application` CR still exists with `automated.selfHeal: true` triggers a resurrection fight—or, if finalizers are omitted, silently orphans CRDs and cluster-scoped bindings.
4. **Vendored Helm chart monorepos rot silently**: Copying upstream charts into a GitOps repository accumulates CVE lag across storage CSI drivers, log shippers, GPU operators, and database operators, while Helm v3 refuses to upgrade `crds/` directories and client-side `kubectl apply` chokes on the 262,144-byte `last-applied-configuration` annotation ceiling.

Hardening a production GitOps control plane requires replacing ad-hoc YAML syncing with four disciplined subsystems: **desired-subset semantic diffing**, **optimistic-concurrency (`resourceVersion` CAS) policy persistence**, **finalizer-ordered preview lifecycles**, and **digest-pinned upstream/OCI Helm pipelines with split-CRD sync waves**.

---

## 1. Control-Plane Architecture: Desired-Subset Diffing, CAS Guards, and Provenance-Pinned Artifacts

A resilient GitOps platform separates **supply-chain verification**, **semantic drift computation**, **admission/policy state**, and **namespace lifecycle ordering** into explicit, failure-bounded stages:

```text
+-----------------------------------------------------------------------------------+
|               HARDENED KUBERNETES GITOPS CONTROL-PLANE ARCHITECTURE               |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [1] SUPPLY CHAIN & ARTIFACT PLANE                                                |
|  ├── Git Manifests + Upstream Helm Repos (version-pinned) + oci:// OCI Digests    |
|  ├── Signature Gate (Cosign keyless / KMS verify before chart unpack)             |
|  └── Split-CRD Sync Waves (wave "-1" CRDs w/ ServerSideApply -> wave "0" Operator)|
|                                         |                                         |
|                                         v                                         |
|  [2] SEMANTIC DRIFT ENGINE                                                        |
|  ├── Desired-Subset Recursive Diff (ignores undeclared kube-apiserver defaults)   |
|  ├── OpenAPI Merge-Key List Matching (containers[].name, env[].name, ports[])     |
|  ├── Server-Side Apply DryRun=All (validates schema + mutating webhook output)    |
|  └── Global Orphan Pass (ownerReferences + tracking-id -> REFUSE blind prune!)    |
|                                         |                                         |
|                                         v                                         |
|  [3] ADMISSION & POLICY PLANE                                                     |
|  ├── Live Validating/MutatingWebhookConfiguration Probe (fail -> Unknown, not 0)  |
|  └── ConfigMap Policy Store via resourceVersion CAS (HTTP 409 retry + read-back)  |
|                                         |                                         |
|                                         v                                         |
|  [4] EPHEMERAL PREVIEW LIFECYCLE & FINALIZERS                                     |
|  ├── Provision: PSS Namespace (baseline) -> Application CR -> Ingress -> Ready    |
|  └── Teardown:  Delete Application CR (finalizer cascade) -> Wait 404 -> Delete NS|
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

### Naive GitOps vs. Hardened Control-Plane Engineering

| Control-Plane Surface | Naive GitOps Implementation | Hardened Control-Plane Architecture |
| :--- | :--- | :--- |
| **Diff Semantics** | Deep-equals full live JSON vs. Git YAML | **Desired-subset comparison**: validates only declared keys; strips `status`, `managedFields`, and server-assigned metadata |
| **Array / List Matching** | Positional index comparison (`arr[0] == arr[0]`) | **Strategic merge-key matching** (`name`, `mountPath`, `containerPort`) before falling back to index order |
| **Orphan Handling** | Blind `prune: true` or silently ignored untracked objects | **Explicit orphan classification**: checks `ownerReferences` and tracking IDs; refuses auto-sync on untracked objects; emits operator-reviewed `HEAD` diff |
| **Policy Persistence** | In-memory toggle flags or blind `kubectl apply -f` | **`resourceVersion` CAS loop** on `ConfigMap` (`HTTP 409` retry), strict JSON validation, and read-after-write verification |
| **Preview Teardown** | `kubectl delete ns preview-42` directly | **Strict cascade**: delete `Application` CR (with `resources-finalizer`), wait for `404`, then delete `Namespace`; rollback failed creates |
| **Chart & CRD Provenance** | Vendored chart copies in Git; Helm `crds/` directory | **Pinned upstream / `oci://` sha256 digests** + Cosign verify + split CRD sync wave (`ServerSideApply=true`) |

---

## 2. Desired-Subset Semantic Diffing vs. Server-Side Apply (`managedFields`)

When you `kubectl apply` a minimal `Deployment` manifest, `kube-apiserver` injects dozens of fields before persisting the object to etcd:
- **ObjectMeta**: `uid`, `resourceVersion`, `generation`, `creationTimestamp`, `managedFields`, `selfLink` (legacy), and admission-injected annotations.
- **PodSpec & Service Defaults**: `terminationGracePeriodSeconds: 30`, `dnsPolicy: ClusterFirst`, `restartPolicy: Always`, `schedulerName: default-scheduler`, `securityContext: {}`, `spec.clusterIP`, `spec.ipFamilies`.
- **Dynamic Runtime Ownership**: `kube-controller-manager` (HPA) writes `spec.replicas`; service-mesh webhooks inject `initContainers`, `containers` (`envoy` / proxy), and `volumes`.

Comparing the full live etcd object back against Git flags every server-injected key as "out of sync." Worse, treating slices like `spec.template.spec.containers` or `env` as positional arrays triggers false diffs whenever a mutating admission webhook prepends a sidecar at index `0`.

### How Server-Side Apply `managedFields` Solves Split Ownership

Since Kubernetes 1.22 (GA), **Server-Side Apply (`SSA`)** tracks field-level ownership inside `metadata.managedFields` as a `fieldsV1` trie keyed by `manager` and `operation`:

- Your GitOps controller applies with `fieldManager=argocd-controller` (or `flux-kustomize-controller`) and `force=true` **only for fields present in Git**.
- `kube-controller-manager` owns `f:spec.f:replicas` when HPA scales the workload.
- A mutating webhook owns the injected sidecar entry `k:{"name":"istio-proxy"}`.
- Because Kubernetes merges declarative fields per manager, a GitOps SSA apply **never strips HPA scaling or webhook-injected sidecars** unless Git explicitly declares a conflicting key under the same merge key.

### Building a Deterministic Desired-Subset Drift Engine

Outside pure ArgoCD/Flux loops—such as custom fleet reconciliation engines, pre-merge PR drift previews, or reverse-commit generators that turn live hotfixes back into reviewable Git patches—a drift engine needs three deterministic passes:

1. **Server-Noise Stripping**: Remove non-semantic runtime trees (`status`, `metadata.uid`, `metadata.resourceVersion`, `metadata.generation`, `metadata.creationTimestamp`, `metadata.managedFields`, `kubectl.kubernetes.io/last-applied-configuration`) before walking either object.
2. **Desired-Subset Recursive Walk (`DiffDesiredSubset`)**: Only recurse into keys present in `desired`. If `live` contains extra server-defaulted keys (`dnsPolicy`, `terminationGracePeriodSeconds`) absent from `desired`, treat them as compliant rather than drift.
3. **Merge-Key List Matching + Orphan Guard (`ClassifyOrphans`)**: Match slices of maps by Kubernetes OpenAPI `x-kubernetes-patch-merge-key` (`name`, `mountPath`, `containerPort`, `ip`, `protocol`). For live cluster objects missing from Git entirely, verify `metadata.ownerReferences` and tracking annotations (`argocd.argoproj.io/tracking-id`, `kustomize.toolkit.fluxcd.io/name`). **Refuse automatic sync/prune on untracked orphans**—surface a unified diff anchored to the current `HEAD` commit SHA so an engineer merges or deletes intentionally.

Here is a self-contained Go implementation (`desired_subset_diff.go`) demonstrating desired-subset diffing, strategic merge-key list alignment, and orphan refusal:

```go
// desired_subset_diff.go — Desired-subset Kubernetes drift & orphan classifier
package drift

import (
	"fmt"
	"reflect"
	"sort"
	"strings"
)

type DriftFinding struct {
	Path    string `json:"path"`
	Desired any    `json:"desired,omitempty"`
	Live    any    `json:"live,omitempty"`
	Reason  string `json:"reason"`
}

type OrphanClassification struct {
	GVK        string `json:"gvk"`
	Namespace  string `json:"namespace"`
	Name       string `json:"name"`
	OwnerKind  string `json:"ownerKind,omitempty"`
	TrackedBy  string `json:"trackedBy,omitempty"`
	SyncAction string `json:"syncAction"` // "SKIP_OWNED" | "REFUSE_UNTRACKED_ORPHAN"
}

var serverNoiseMetaKeys = map[string]bool{
	"uid":               true,
	"resourceVersion":   true,
	"generation":        true,
	"creationTimestamp": true,
	"managedFields":     true,
}

// Well-known Kubernetes OpenAPI x-kubernetes-patch-merge-key mappings
var mergeKeyByListPath = map[string]string{
	"spec.containers":                    "name",
	"spec.initContainers":                "name",
	"spec.ephemeralContainers":           "name",
	"spec.volumes":                       "name",
	"spec.template.spec.containers":      "name",
	"spec.template.spec.initContainers":  "name",
	"spec.template.spec.volumes":         "name",
	"env":                                "name",
	"volumeMounts":                       "mountPath",
	"ports":                              "containerPort",
	"rules":                              "host",
	"subjects":                           "name",
}

// DiffDesiredSubset compares ONLY fields declared in desired against live.
// Server-injected defaults absent from desired are never treated as drift.
func DiffDesiredSubset(path string, desired, live any) []DriftFinding {
	if desired == nil {
		return nil
	}
	if live == nil {
		return []DriftFinding{{Path: path, Desired: desired, Live: nil, Reason: "missing_in_live"}}
	}

	switch dVal := desired.(type) {
	case map[string]any:
		lMap, ok := live.(map[string]any)
		if !ok {
			return []DriftFinding{{Path: path, Desired: dVal, Live: live, Reason: "type_mismatch"}}
		}
		var findings []DriftFinding
		keys := make([]string, 0, len(dVal))
		for k := range dVal {
			if path == "metadata" && serverNoiseMetaKeys[k] {
				continue
			}
			if path == "" && k == "status" {
				continue
			}
			keys = append(keys, k)
		}
		sort.Strings(keys)
		for _, k := range keys {
			childPath := k
			if path != "" {
				childPath = path + "." + k
			}
			if k == "annotations" && path == "metadata" {
				findings = append(findings, diffAnnotationsSubset(childPath, dVal[k], lMap[k])...)
				continue
			}
			findings = append(findings, DiffDesiredSubset(childPath, dVal[k], lMap[k])...)
		}
		return findings

	case []any:
		lSlice, ok := live.([]any)
		if !ok {
			return []DriftFinding{{Path: path, Desired: dVal, Live: live, Reason: "slice_type_mismatch"}}
		}
		if keyField, ok := lookupMergeKey(path); ok {
			return diffKeyedSlice(path, keyField, dVal, lSlice)
		}
		if len(dVal) != len(lSlice) {
			return []DriftFinding{{Path: path, Desired: len(dVal), Live: len(lSlice), Reason: "length_mismatch"}}
		}
		var findings []DriftFinding
		for i := range dVal {
			findings = append(findings, DiffDesiredSubset(fmt.Sprintf("%s[%d]", path, i), dVal[i], lSlice[i])...)
		}
		return findings

	default:
		if !reflect.DeepEqual(desired, live) {
			return []DriftFinding{{Path: path, Desired: desired, Live: live, Reason: "value_drifted"}}
		}
		return nil
	}
}

func diffKeyedSlice(path, keyField string, desired, live []any) []DriftFinding {
	liveByKey := make(map[string]map[string]any, len(live))
	for _, item := range live {
		m, ok := item.(map[string]any)
		if !ok {
			continue
		}
		if keyVal, exists := m[keyField]; exists {
			liveByKey[fmt.Sprint(keyVal)] = m
		}
	}
	var findings []DriftFinding
	for _, item := range desired {
		dMap, ok := item.(map[string]any)
		if !ok {
			continue
		}
		kStr := fmt.Sprint(dMap[keyField])
		itemPath := fmt.Sprintf("%s[%s=%s]", path, keyField, kStr)
		lMap, found := liveByKey[kStr]
		if !found {
			findings = append(findings, DriftFinding{Path: itemPath, Desired: dMap, Reason: "keyed_element_missing"})
			continue
		}
		findings = append(findings, DiffDesiredSubset(itemPath, dMap, lMap)...)
	}
	return findings
}

func diffAnnotationsSubset(path string, desired, live any) []DriftFinding {
	dMap, okD := desired.(map[string]any)
	lMap, okL := live.(map[string]any)
	if !okD || !okL {
		return DiffDesiredSubset(path, desired, live)
	}
	var findings []DriftFinding
	for k, dv := range dMap {
		if k == "kubectl.kubernetes.io/last-applied-configuration" {
			continue
		}
		if lv, exists := lMap[k]; !exists || !reflect.DeepEqual(dv, lv) {
			findings = append(findings, DriftFinding{Path: path + "." + k, Desired: dv, Live: lv, Reason: "annotation_drifted"})
		}
	}
	return findings
}

func lookupMergeKey(path string) (string, bool) {
	if k, ok := mergeKeyByListPath[path]; ok {
		return k, true
	}
	// Strip bracketed selectors before checking leaf field names (e.g., "...containers[name=app].env")
	lastDot := strings.LastIndex(path, ".")
	if lastDot >= 0 {
		leaf := path[lastDot+1:]
		if k, ok := mergeKeyByListPath[leaf]; ok {
			return k, true
		}
	}
	return "", false
}

// ClassifyOrphans runs once globally across live objects absent from the desired Git set.
// Untracked live objects are NEVER auto-pruned; operator-owned objects are skipped cleanly.
func ClassifyOrphans(liveObjects []map[string]any, desiredKeys map[string]bool) []OrphanClassification {
	var out []OrphanClassification
	for _, obj := range liveObjects {
		gvk := fmt.Sprintf("%v/%v", obj["apiVersion"], obj["kind"])
		meta, _ := obj["metadata"].(map[string]any)
		ns, _ := meta["namespace"].(string)
		name, _ := meta["name"].(string)
		key := fmt.Sprintf("%s|%s|%s", gvk, ns, name)
		if desiredKeys[key] {
			continue
		}
		if owners, ok := meta["ownerReferences"].([]any); ok && len(owners) > 0 {
			ownerMap, _ := owners[0].(map[string]any)
			out = append(out, OrphanClassification{
				GVK: gvk, Namespace: ns, Name: name,
				OwnerKind:  fmt.Sprint(ownerMap["kind"]),
				SyncAction: "SKIP_OWNED",
			})
			continue
		}
		anns, _ := meta["annotations"].(map[string]any)
		trackedBy := fmt.Sprint(anns["argocd.argoproj.io/tracking-id"])
		out = append(out, OrphanClassification{
			GVK: gvk, Namespace: ns, Name: name,
			TrackedBy:  trackedBy,
			SyncAction: "REFUSE_UNTRACKED_ORPHAN",
		})
	}
	return out
}
```

Notice the operational safety boundary in `ClassifyOrphans`: if a cluster administrator creates a break-glass `NetworkPolicy` or temporary `ConfigMap` directly via `kubectl`, it lacks a Git counterpart and has no `ownerReferences`. Returning `REFUSE_UNTRACKED_ORPHAN` guarantees that clicking "Reconcile" never deletes unmodeled infrastructure, while a separate **reverse-commit generator** can export the scrubbed live resource against the current `HEAD` commit SHA as a reviewable unified patch—never mutating Git history silently.

---

## 3. Admission Webhook Fail-Modes & Optimistic-Concurrency (`resourceVersion` CAS) Policy Persistence

Every write reaching `kube-apiserver` traverses a strict pipeline before touching etcd:

```text
Request -> AuthN -> AuthZ -> MutatingAdmissionWebhook -> OpenAPI Schema -> ValidatingAdmissionWebhook -> etcd CAS
```

Two anti-patterns routinely break GitOps policy and admission-guard controllers in production:

1. **In-Memory Policy Toggles & Blind Overwrites**: Storing policy enforcement state in controller RAM resets whenever a pod restarts or scales horizontally. Conversely, calling `kubectl apply -f -` or `Update()` with a blank `ResourceVersion` silently clobbers rules edited concurrently by another operator or CI pipeline. Always use **etcd Optimistic Concurrency Control (CAS)** via `metadata.resourceVersion`: read the current `ConfigMap`, verify and mutate in memory, call `Update()` preserving `ResourceVersion`, retry cleanly on `apierrors.IsConflict(err)` (`HTTP 409`), fail loudly if stored JSON is malformed (never silently reset to defaults), and read back after write to confirm persistence.
2. **Failing Open to "Zero Webhooks Installed"**: When inspecting live `ValidatingWebhookConfiguration` and `MutatingWebhookConfiguration` objects to verify cluster admission guard coverage, RBAC denials (`403 Forbidden`) or API-server timeouts must transition UI and health probes to **`Unknown / Error`**, never report `"0 webhooks installed"`. Claiming no admission controllers exist during a transient API outage masks active policy enforcement—or worse, prompts operators to re-apply breaking configurations.

The Go helper below (`cas_policy_guard.go`) implements both the `resourceVersion` CAS update loop and a webhook fail-closed safety audit:

```go
// cas_policy_guard.go — etcd CAS policy store & admission webhook safety probe
package policy

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"

	corev1 "k8s.io/api/core/v1"
	apierrors "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
)

type PolicyRuleSet struct {
	Version int             `json:"version"`
	Enabled map[string]bool `json:"enabled"`
}

type WebhookAudit struct {
	Name          string `json:"name"`
	FailurePolicy string `json:"failurePolicy"`
	UnsafeScope   bool   `json:"unsafeScope"`
}

// ToggleGuardRule atomically updates a ConfigMap policy rule using etcd resourceVersion CAS.
// Rejects corrupt JSON loudly instead of silently resetting state.
func ToggleGuardRule(ctx context.Context, cs kubernetes.Interface, ns, cmName, ruleID string, enable bool) (*PolicyRuleSet, error) {
	const maxRetries = 5
	for attempt := 0; attempt < maxRetries; attempt++ {
		cm, err := cs.CoreV1().ConfigMaps(ns).Get(ctx, cmName, metav1.GetOptions{})
		created := false
		var state PolicyRuleSet

		if apierrors.IsNotFound(err) {
			created = true
			cm = &corev1.ConfigMap{
				ObjectMeta: metav1.ObjectMeta{Name: cmName, Namespace: ns},
				Data:       map[string]string{},
			}
			state = PolicyRuleSet{Version: 1, Enabled: map[string]bool{}}
		} else if err != nil {
			return nil, fmt.Errorf("read policy ConfigMap %s/%s: %w", ns, cmName, err)
		} else {
			raw, ok := cm.Data["rules.json"]
			if !ok {
				return nil, fmt.Errorf("corrupt policy ConfigMap %s/%s: missing rules.json key", ns, cmName)
			}
			dec := json.NewDecoder(bytes.NewBufferString(raw))
			dec.DisallowUnknownFields()
			if err := dec.Decode(&state); err != nil || state.Enabled == nil {
				return nil, fmt.Errorf("malformed rules.json in %s/%s (refusing silent reset): %w", ns, cmName, err)
			}
		}

		state.Enabled[ruleID] = enable
		encoded, err := json.Marshal(state)
		if err != nil {
			return nil, err
		}
		if cm.Data == nil {
			cm.Data = map[string]string{}
		}
		cm.Data["rules.json"] = string(encoded)

		// Preserve cm.ObjectMeta.ResourceVersion so kube-apiserver enforces etcd Compare-And-Swap
		if created {
			_, err = cs.CoreV1().ConfigMaps(ns).Create(ctx, cm, metav1.CreateOptions{})
		} else {
			_, err = cs.CoreV1().ConfigMaps(ns).Update(ctx, cm, metav1.UpdateOptions{})
		}
		if apierrors.IsConflict(err) || apierrors.IsAlreadyExists(err) {
			continue // Concurrent writer won; re-read fresh resourceVersion
		}
		if err != nil {
			return nil, fmt.Errorf("CAS persist failed: %w", err)
		}

		// Read-back confirmation
		verified, err := cs.CoreV1().ConfigMaps(ns).Get(ctx, cmName, metav1.GetOptions{})
		if err != nil {
			return nil, fmt.Errorf("read-back verification failed: %w", err)
		}
		var out PolicyRuleSet
		if err := json.Unmarshal([]byte(verified.Data["rules.json"]), &out); err != nil {
			return nil, fmt.Errorf("read-back decode failed: %w", err)
		}
		return &out, nil
	}
	return nil, errors.New("exceeded CAS conflict retries updating policy store")
}

// AuditValidatingWebhooks returns live admission webhooks and flags failurePolicy=Fail
// hooks lacking a kube-system exclusion. API errors propagate instead of returning an empty slice.
func AuditValidatingWebhooks(ctx context.Context, cs kubernetes.Interface) ([]WebhookAudit, error) {
	list, err := cs.AdmissionregistrationV1().ValidatingWebhookConfigurations().List(ctx, metav1.ListOptions{})
	if err != nil {
		return nil, fmt.Errorf("webhook audit unavailable (state Unknown): %w", err)
	}
	var audits []WebhookAudit
	for _, cfg := range list.Items {
		for _, wh := range cfg.Webhooks {
			fp := "Fail"
			if wh.FailurePolicy != nil {
				fp = string(*wh.FailurePolicy)
			}
			excludesKubeSystem := false
			if wh.NamespaceSelector != nil {
				for _, expr := range wh.NamespaceSelector.MatchExpressions {
					if expr.Key == "kubernetes.io/metadata.name" && expr.Operator == metav1.LabelSelectorOpNotIn {
						for _, v := range expr.Values {
							if v == "kube-system" {
								excludesKubeSystem = true
							}
						}
					}
				}
			}
			audits = append(audits, WebhookAudit{
				Name:          fmt.Sprintf("%s/%s", cfg.Name, wh.Name),
				FailurePolicy: fp,
				UnsafeScope:   fp == "Fail" && !excludesKubeSystem,
			})
		}
	}
	return audits, nil
}
```

---

## 4. Finalizer-Safe Ephemeral Preview Environments & Defeating the `selfHeal` Resurrection Loop

Ephemeral per-PR preview environments expose a classic Kubernetes controller deadlock when teams mix ArgoCD `Application` CRs (living in namespace `argocd`) with workload namespaces (`pr-145-preview`).

Consider what happens if your teardown code simply executes `kubectl delete namespace pr-145-preview`:
1. `kube-apiserver` sets `metadata.deletionTimestamp` on `pr-145-preview` and moves it to `Terminating`.
2. `namespace-controller` begins enumerating and deleting every namespaced resource inside `pr-145-preview`.
3. **Simultaneously**, ArgoCD's `application-controller` (watching the `Application` CR in the `argocd` namespace) sees the target resources disappear, triggers `syncPolicy.automated.selfHeal: true`, and fires `Create` requests back into `pr-145-preview`!
4. The API server rejects new creations in a terminating namespace (`Forbidden: unable to create new content in namespace because it is being terminated`), leaving the `Application` stuck in `ComparisonError` / `OutOfSync` indefinitely—or if `CreateNamespace=true` is enabled and deletion wasn't finished, recreating the namespace outright.
5. Conversely, deleting the `Application` CR *without* `metadata.finalizers: [resources-finalizer.argocd.argoproj.io]` removes the ArgoCD CR from etcd immediately while leaving every `Deployment`, `PVC`, `Ingress`, and `LoadBalancer` running as billed cloud orphans.

### Deterministic Preview Provisioning & Teardown Order

Every ephemeral preview manager must implement an explicit state machine:

- **Provision (`namespace -> deploy -> ingress -> verify -> active`)**:
  1. Probe cluster reachability first (fail fast with `503` rather than faking state).
  2. Create the preview `Namespace` labeled with Pod Security Standards (`pod-security.kubernetes.io/enforce: baseline`).
  3. Create the preview-scoped ArgoCD `Application` CR (`resources-finalizer.argocd.argoproj.io`, `CreateNamespace=false`) and dedicated `Ingress`.
  4. Keep status as `provisioning` until `Namespace`, workload readiness, and `Ingress` status are confirmed live. If `deploy` fails, **immediately roll back and delete the created `Namespace`** so failed deploys never leave orphan namespaces behind.
- **Teardown (`delete Application CR -> wait 404 -> delete Namespace -> wait 404`)**:
  1. Delete the `Application` CR in `argocd` first. Because `resources-finalizer.argocd.argoproj.io` is set, ArgoCD synchronously cascades deletion of all managed workloads *before* removing its own finalizer and disappearing.
  2. Poll until `Application` returns `404 NotFound`.
  3. Delete the preview `Namespace` and wait for `404 NotFound` (swept by a background TTL reaper, e.g. every 30s, so expired previews never accumulate).

Here is the hardened manifest pair (`preview-namespace-and-app.yaml`):

```yaml
# preview-namespace-and-app.yaml — PSS-enforced preview namespace + cascading Application CR
apiVersion: v1
kind: Namespace
metadata:
  name: preview-pr-145
  labels:
    app.kubernetes.io/managed-by: preview-reaper
    preview.platform.io/ttl-expires: "2026-11-25T08:00:00Z"
    pod-security.kubernetes.io/enforce: baseline
    pod-security.kubernetes.io/enforce-version: latest
    pod-security.kubernetes.io/audit: restricted
    pod-security.kubernetes.io/warn: restricted
---
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: preview-pr-145-app
  namespace: argocd
  finalizers:
    # Forces ArgoCD to cascade-delete managed child resources BEFORE deleting this CR
    - resources-finalizer.argoproj.io
spec:
  project: previews
  source:
    repoURL: https://git.example.com/platform/app-manifests.git
    targetRevision: pr-145
    path: deploy/preview
    helm:
      parameters:
        - name: ingress.host
          value: pr-145.preview.example.com
  destination:
    server: https://kubernetes.default.svc
    namespace: preview-pr-145
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      # Never let ArgoCD auto-recreate a namespace being terminated by the reaper
      - CreateNamespace=false
      - ServerSideApply=true
```

And the matching Go teardown routine (`teardown_preview.go`) that enforces strict ordering and inspects `Namespace.Status.Conditions` when finalizers stall:

```go
// teardown_preview.go — Finalizer-ordered preview teardown without selfHeal resurrection
package preview

import (
	"context"
	"fmt"
	"time"

	corev1 "k8s.io/api/core/v1"
	apierrors "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/client-go/dynamic"
	"k8s.io/client-go/kubernetes"
)

var argoAppGVR = schema.GroupVersionResource{
	Group:    "argoproj.io",
	Version:  "v1alpha1",
	Resource: "applications",
}

// DestroyPreview deletes the ArgoCD Application CR first (waiting for its resources-finalizer
// cascade to complete), then deletes the target Namespace and confirms 404 clearance.
func DestroyPreview(ctx context.Context, dyn dynamic.Interface, cs kubernetes.Interface, appName, previewNS string) error {
	// Step 1: Delete Application CR in argocd namespace first
	err := dyn.Resource(argoAppGVR).Namespace("argocd").Delete(ctx, appName, metav1.DeleteOptions{})
	if err != nil && !apierrors.IsNotFound(err) {
		return fmt.Errorf("delete Application %s: %w", appName, err)
	}
	if err := waitGone(ctx, 2*time.Minute, func() error {
		_, gErr := dyn.Resource(argoAppGVR).Namespace("argocd").Get(ctx, appName, metav1.GetOptions{})
		return gErr
	}); err != nil {
		return fmt.Errorf("Application %s finalizer cascade timed out: %w", appName, err)
	}

	// Step 2: Delete preview Namespace only after ArgoCD is gone (eliminates selfHeal race)
	err = cs.CoreV1().Namespaces().Delete(ctx, previewNS, metav1.DeleteOptions{})
	if err != nil && !apierrors.IsNotFound(err) {
		return fmt.Errorf("delete Namespace %s: %w", previewNS, err)
	}
	if err := waitGone(ctx, 2*time.Minute, func() error {
		nsObj, gErr := cs.CoreV1().Namespaces().Get(ctx, previewNS, metav1.GetOptions{})
		if gErr == nil {
			checkTerminatingStall(nsObj)
		}
		return gErr
	}); err != nil {
		return fmt.Errorf("Namespace %s teardown timed out: %w", previewNS, err)
	}
	return nil
}

func checkTerminatingStall(ns *corev1.Namespace) {
	for _, cond := range ns.Status.Conditions {
		if (cond.Type == corev1.NamespaceContentRemaining || cond.Type == corev1.NamespaceFinalizersRemaining) &&
			cond.Status == corev1.ConditionTrue {
			// Surface actionable blocker instead of blind timeout (e.g., stuck PVC finalizer)
			_ = fmt.Sprintf("ns=%s condition=%s msg=%s", ns.Name, cond.Type, cond.Message)
		}
	}
}

func waitGone(ctx context.Context, timeout time.Duration, probe func() error) error {
	deadline := time.NewTimer(timeout)
	defer deadline.Stop()
	ticker := time.NewTicker(1 * time.Second)
	defer ticker.Stop()

	for {
		if err := probe(); apierrors.IsNotFound(err) {
			return nil
		}
		select {
		case <-ctx.Done():
			return ctx.Err()
		case <-deadline.C:
			return fmt.Errorf("timed out waiting for NotFound after %s", timeout)
		case <-ticker.C:
		}
	}
}
```

---

## 5. Breaking Out of Vendored Helm Chart Rot: Upstream Pinning, `oci://` Digests, and the Split-CRD Upgrade Trap

Many platform teams initially copy upstream Helm charts (`charts/rook-ceph`, `charts/gpu-operator`, `charts/opentelemetry-operator`, `charts/spegel`, `charts/velero`) directly into their GitOps monorepo ("vendoring") to guarantee air-gapped reproducibility.

Within months, vendoring creates two chronic hazards:
1. **Silent CVE & Version Drift**: Updating two dozen vendored charts generates 50,000-line pull requests nobody can review, so teams stop updating them—leaving `kube-prometheus-stack`, CSI drivers, ingress controllers, and Harbor/registry components months behind upstream security fixes.
2. **The Helm v3 `crds/` Non-Upgrade & 262 KB Annotation Trap**: Helm v3 installs manifests inside a chart's `crds/` directory **only on initial `helm install`**, and explicitly refuses to upgrade or delete them on subsequent `helm upgrade` runs. Worse, if you place giant operator CRDs (like `mariadb-operator`, `prometheus-operator`, or `cert-manager`) into templates using client-side apply, `kube-apiserver` rejects any CRD whose serialized JSON exceeds the **262,144-byte (`256 KiB`) `metadata.annotations["kubectl.kubernetes.io/last-applied-configuration"]` limit** (`Too long: may not be more than 262144 bytes`).

### Wave-Based Upstream Migration Strategy

Eliminating vendored bloat safely across a live fleet requires splitting the migration into two deterministic waves before deleting vendored directories:
- **Wave 1 (Exact-Version Parity)**: Repoint ArgoCD/Flux manifests from `path: charts/<app>` to the upstream Helm repository or `oci://` registry **at the exact version currently vendored**. Rendered manifests remain identical, isolating transport/auth issues (OCI registry rate limits, proxy caching, TLS trust) from application upgrades.
- **Wave 2 (Live-Verified Pins + Values Schema Migration)**: Advance patch/minor tracks to versions verified directly against each upstream `index.yaml` or OCI registry manifest, updating broken `values.yaml` renames (for example, split CRD subcharts or refactored Flux `OCIRepository` sources) and keeping `targetRevision` explicitly pinned—never tracking floating branches or `*`.

### Split-CRD Sync Waves & Digest-Pinned OCI Artifacts

To bypass Helm's `crds/` refusal and the 256 KiB client-side annotation limit simultaneously, deploy CRDs as a dedicated ArgoCD `Application` at `sync-wave: "-1"` with `ServerSideApply=true`, and deploy the operator chart at `sync-wave: "0"`. For OCI-distributed charts (`oci://`), pin immutable `sha256:` digests and verify signatures with Cosign:

```yaml
# upstream-oci-split-crd-apps.yaml — Split-CRD SSA sync wave + Cosign-verified OCI chart
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: mariadb-operator-crds
  namespace: argocd
  annotations:
    # Wave -1 guarantees CRDs register in kube-apiserver before operator Deployment starts
    argocd.argoproj.io/sync-wave: "-1"
spec:
  project: infrastructure
  source:
    repoURL: https://helm.mariadb.com/mariadb-operator
    chart: mariadb-operator-crds
    targetRevision: "26.10.2"
  destination:
    server: https://kubernetes.default.svc
    namespace: mariadb-operator
  syncPolicy:
    automated:
      prune: false # Never blindly purge CRDs and wipe stateful Custom Resources!
      selfHeal: true
    syncOptions:
      # Eliminates 262,144-byte last-applied-configuration failure on large CRDs
      - ServerSideApply=true
      - CreateNamespace=true
---
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: mariadb-operator
  namespace: argocd
  annotations:
    argocd.argoproj.io/sync-wave: "0"
spec:
  project: infrastructure
  source:
    repoURL: https://helm.mariadb.com/mariadb-operator
    chart: mariadb-operator
    targetRevision: "26.10.2"
    helm:
      releaseName: mariadb-operator
      valuesObject:
        crds:
          enabled: false # Managed exclusively by wave -1 Application above
  destination:
    server: https://kubernetes.default.svc
    namespace: mariadb-operator
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - ServerSideApply=true
      - SkipDryRunOnMissingResource=true
---
# Flux OCIRepository with immutable sha256 digest pin + Cosign keyless signature check
apiVersion: source.toolkit.fluxcd.io/v1beta2
kind: OCIRepository
metadata:
  name: spegel-chart
  namespace: flux-system
spec:
  interval: 10m
  url: oci://ghcr.io/spegel-org/helm-charts/spegel
  ref:
    semver: "0.8.1"
    # Pinning digest prevents silent tag mutation inside upstream OCI registries
    digest: sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef
  verify:
    provider: cosign
    matchOIDCIdentity:
      - issuer: "^https://token\\.actions\\.githubusercontent\\.com$"
        subject: "^https://github\\.com/spegel-org/spegel/\\.github/workflows/.*$"
```

Notice `prune: false` on `mariadb-operator-crds`: deleting a CRD deletes **every instance of that Custom Resource across the entire cluster** via garbage collection. CRD applications must never run with automated pruning enabled.

---

## 6. Five Production Traps That Break GitOps Control Planes

### Trap 1: Server-Defaulting & HPA / Sidecar-Webhook `managedFields` Ping-Pong

You enable `selfHeal: true` on a workload with a `HorizontalPodAutoscaler` and an injected service-mesh sidecar. Every 3 minutes, ArgoCD reconciles `spec.replicas` back to `2` while HPA scales it back to `8`, generating continuous etcd churn and pod restarts. **Fix**: Omit `spec.replicas` from Git manifests for HPA-managed workloads (desired-subset semantics), enable `ServerSideApply=true` + `RespectIgnoreDifferences=true`, and configure `ignoreDifferences` for webhook-mutated `jqPathExpressions` or `managedFieldsManagers: ["kube-controller-manager"]`.

### Trap 2: The `selfHeal: true` Zombie Namespace & Dead Aggregated `APIService`

Even when you delete an `Application` CR before its `Namespace`, a preview `Namespace` can wedge permanently in `Terminating`—**and block every other namespace deletion across the entire cluster**—if any aggregated `APIService` (such as a crashed `metrics-server` or custom metrics adapter) stops responding. Because `namespace-controller` queries every registered API group discovery endpoint to enumerate residual resources, a single `False (FailedDiscoveryCheck)` `APIService` halts garbage collection cluster-wide until the dead `APIService` is repaired or removed.

### Trap 3: Blind Auto-Pruning of Operator-Owned (`ownerReferences`) and Break-Glass Resources

Naive reconcilers that list all objects in a namespace and delete anything absent from Git wipe out runtime secrets created by `cert-manager`, `ClusterIssuer` children, or emergency `NetworkPolicy` overrides applied during an incident. Always classify orphans globally first: skip objects with `metadata.ownerReferences`, and refuse automated deletion on untracked objects unless explicitly confirmed by an operator.

### Trap 4: `failurePolicy: Fail` Admission Webhook Self-Lockout

Installing a `ValidatingWebhookConfiguration` (Kyverno, OPA Gatekeeper, or custom guardrails) with `failurePolicy: Fail` and no `namespaceSelector` excluding `kube-system` and the webhook's own namespace creates a circular bootstrap deadlock: if the webhook pods restart or roll during a node drain, `kube-apiserver` rejects the `Pod` creation requests needed to start the webhook pods themselves! Always verify `namespaceSelector` exclusions and surface API probe failures as `Unknown` rather than assuming zero policies are active.

### Trap 5: Mutable `oci://` Semver Tags & the 262,144-Byte Client-Side Apply CRD Wall

Treating an OCI tag like `0.8.1` as immutable overlooks that OCI registries allow mutable tag overwrites—a compromised CI token can overwrite a semver tag in place with a malicious chart archive. Pair `targetRevision` with an immutable `sha256:` digest and Cosign OIDC verification (`verify.provider: cosign`), and always toggle `ServerSideApply=true` on CRD sync waves so large schemas never hit the 262,144-byte `last-applied-configuration` annotation ceiling.

---

## 7. Field Verification & Lab Diagnostics Checklist

Use these commands to audit Server-Side Apply ownership, dry-run drift, webhook blast radius, stuck namespace finalizers, and upstream OCI provenance on a live cluster:

```bash
# 1. Inspect Server-Side Apply fieldManager ownership on a Deployment (HPA vs. GitOps controller)
kubectl get deploy api-gateway -n prod -o json \
  | jq '.metadata.managedFields[] | {manager, operation, subresource, fieldsV1}'

# 2. Run a Server-Side Apply dry-run diff without hitting last-applied-configuration limits
kubectl diff --server-side --field-manager=gitops-reconciler -f deploy/prod/

# 3. Audit ValidatingWebhookConfigurations for failurePolicy=Fail without kube-system exclusion
kubectl get validatingwebhookconfigurations -o json \
  | jq -r '.items[].webhooks[] | [.name, .failurePolicy, (.namespaceSelector.matchExpressions // [] | tostring)] | @tsv'

# 4. Diagnose stuck Terminating namespaces and dead aggregated APIServices halting discovery
kubectl get ns --field-selector status.phase=Terminating -o json \
  | jq '.items[] | {name: .metadata.name, conditions: .status.conditions}'
kubectl get apiservice | awk 'NR==1 || $3 != "True"'

# 5. Resolve immutable sha256 digest and verify Cosign signature of an OCI Helm chart before pinning
crane digest ghcr.io/spegel-org/helm-charts/spegel:0.8.1
cosign verify \
  --certificate-oidc-issuer-regexp '^https://token\.actions\.githubusercontent\.com$' \
  --certificate-identity-regexp '^https://github\.com/spegel-org/spegel/' \
  ghcr.io/spegel-org/helm-charts/spegel@sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef
```

---

## Summary: Hardening the GitOps Reconciliation Loop

| Failure Surface | Naive GitOps Failure Mode | Hardened Control-Plane Fix |
| :--- | :--- | :--- |
| **API-Server Defaulting** | Full-object JSON comparison flags `dnsPolicy`, `clusterIP`, and `status` as drift | Desired-subset recursive diff + merge-key list alignment + SSA `managedFields` |
| **Untracked Cluster Objects** | Blind `prune: true` destroys operator children or break-glass hotfixes | Global orphan pass checking `ownerReferences` + `REFUSE_UNTRACKED_ORPHAN` guard |
| **Policy & Webhook State** | In-memory toggle resets; `apply` clobbers; failed probes claim 0 webhooks | `resourceVersion` CAS loop (`HTTP 409` retry) + fail-closed `Unknown` webhook state |
| **Ephemeral Previews** | `delete ns` races `selfHeal: true`; missing finalizer leaks cloud workloads | `resources-finalizer` cascade on `Application` CR -> wait `404` -> delete PSS `Namespace` |
| **Helm & CRD Upgrades** | Vendored CVE lag, silent `crds/` skips, and 262 KB annotation errors | Wave-pinned upstream/`oci://` digests + Cosign verify + wave `-1` SSA CRD sync (`prune: false`) |

When your GitOps platform combines desired-subset semantic diffing, etcd CAS-backed admission policies, strict finalizer teardown ordering, and digest-pinned split-CRD upstream pipelines, reconciliation ceases to be a brittle YAML pusher—and behaves like a deterministic Kubernetes control plane.
