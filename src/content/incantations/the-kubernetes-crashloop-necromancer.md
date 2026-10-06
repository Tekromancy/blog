---
title: "The Kubernetes Crashloop Necromancer: Real-Time Pod Triage"
description: "Scry the graveyard of dying, OOM-killed, and restart-looped Kubernetes containers across all namespaces in a single aligned terminal matrix."
type: "shell"
gofPattern: "Observer (Behavioral)"
gofCategory: "Behavioral"
arcaneSchool: "Divination // Scrying the Graveyard of Dead Pods"
formula: "kubectl get pods -A -o custom-columns='NS:.metadata.namespace,POD:.metadata.name,STATUS:.status.phase,RESTARTS:.status.containerStatuses[0].restartCount,REASON:.status.containerStatuses[0].state.waiting.reason,MESSAGE:.status.containerStatuses[0].state.waiting.message' --sort-by='.status.containerStatuses[0].restartCount' | grep -vE '<none>|Running|Completed' | tail -n 15"
tags: ["shell", "oneliners", "kubernetes", "kubectl", "k8s", "gof-patterns", "devops"]
pubDate: "2026-10-05"
author: "Joshua Edward McLaughlin Cox"
difficulty: "Adept"
draft: false
---

## The Lineage to the Gang of Four

In the Gang of Four philosophy, **Observer** maintains consistency across related objects without tightly coupling them:

> *"Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically."*
> — Gang of Four, *Behavioral Patterns*

Kubernetes itself is built upon the Observer pattern: the reconciliation loops of controllers continuously observe the actual state of cluster resources against the desired state stored in `etcd`.

However, during cascading outages, hundreds of pods fail across dozens of namespaces. Sifting through `kubectl get pods -A` manually is blinding.

The **Crashloop Necromancer** applies an operational **Strategy** to the cluster Observer:
- Rather than inspecting generic strings, it projects a precise JSONPath custom-columns matrix directly from the API server.
- It sorts by container restart velocity, immediately surfacing the pods trapped in infinite crash loops, OOM death spirals, or broken secret mounts.

---

## The Spell Formula

Cast this one-liner the instant alerts start firing or when taking over an unfamiliar Kubernetes cluster:

```bash
kubectl get pods -A \
  -o custom-columns='NS:.metadata.namespace,POD:.metadata.name,STATUS:.status.phase,RESTARTS:.status.containerStatuses[0].restartCount,REASON:.status.containerStatuses[0].state.waiting.reason,MESSAGE:.status.containerStatuses[0].state.waiting.message' \
  --sort-by='.status.containerStatuses[0].restartCount' \
  | grep -vE '<none>|Running|Completed' \
  | tail -n 15
```

---

## Anatomy of the Spell

### 1. `kubectl get pods -A`
Queries the API server for all pod resources across every namespace in the cluster.

### 2. `-o custom-columns=...`
Instead of standard default columns, we reach deep into the Kubernetes pod JSON schema:
- `NS`: Namespace
- `POD`: Pod Name
- `STATUS`: Phase (`Pending`, `Failed`, etc.)
- `RESTARTS`: Extraction of container restart counts from `containerStatuses[0]`
- `REASON`: The explicit waiting reason (`CrashLoopBackOff`, `ImagePullBackOff`, `CreateContainerConfigError`)
- `MESSAGE`: The underlying human-readable failure reason

### 3. `--sort-by='.status.containerStatuses[0].restartCount'`
Orders the entire list in ascending order of restarts so that the worst offending crash loops congregate at the bottom of the list.

### 4. `grep -vE '<none>|Running|Completed'`
The exclusion ward: inverts the match (`-v`), banishing all healthy `Running` pods, successful batch jobs (`Completed`), and non-restarting pods (`<none>`).

### 5. `tail -n 15`
Catches the bottom 15 records—the highest restart counts in the entire cluster—delivering instant diagnostic clarity.

---

## Arcane Lore: Walking the Catacombs

In ancient necromantic rites, priests walked the catacombs not to summon horrors, but to decipher what killed the fallen. In the cloud-native realm, containers die silently in the night, swallowed by the kubelet and resurrected in an endless loop of suffering.

The Crashloop Necromancer gives a voice to the dead containers, compelling them to reveal their fatal curse before you begin your remediation.
