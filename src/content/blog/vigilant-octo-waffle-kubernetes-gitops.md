---
title: "Vigilant Octo Waffle: Automated Local Kubernetes, GitOps & Multi-Service Stacks"
description: "Bootstrapping instant KinD and K3s clusters pre-loaded with ArgoCD, OpenBao, Harbor, and automated mkcert TLS via DeployCoop's vigilant-octo-waffle."
pubDate: "2026-06-09"
heroImage: "8.png"
tags: ["kubernetes", "gitops", "argocd", "devops", "cloud-native"]
authors:
  - "Joshua Edward McLaughlin Cox"
  - "DeployCoop Core Team"
---

Following on the heels of our deep dive into [Kubash](https://kubash.org), there is another critical challenge developers face: building full-featured, multi-tenant Kubernetes application environments locally without spending hours manually wrangling Helm values, ingress manifests, and self-signed TLS certificate trust chains.

Enter [**vigilant-octo-waffle**](https://github.com/DeployCoop/vigilant-octo-waffle), an open-source automation engine developed by **DeployCoop**. While Kubash excels at compiling operating system images and spinning up KVM/QEMU hypervisor nodes from scratch, *vigilant-octo-waffle* targets the developer loop: spinning up reproducible [KinD](https://kind.sigs.k8s.io) or [K3s](https://k3s.io) clusters equipped with an entire GitOps-driven application ecosystem via a single `./up` invocation.

---

## The Architecture: `envsubst`, `yq` & ArgoCD GitOps

Many local orchestrators attempt to solve environment configuration by inventing complex, heavyweight domain-specific languages (DSLs). In contrast, *vigilant-octo-waffle* relies on clean Unix pipeline composability using standard environment variable interpolation (`envsubst`) and structural YAML merging (`yq`).

```
+----------------+      +-------------------+      +-----------------------+
|   .env Files   | ---> |     envsubst      | ---> |   yq Deep Merge       |
| Configuration  |      | Var Interpolation |      | .argo_overrides       |
+----------------+      +-------------------+      +-----------------------+
                                                               |
                                                               v
                                                   +-----------------------+
                                                   |     ArgoCD Engine     |
                                                   | Automated App Delivery|
                                                   +-----------------------+
```

### Decoupled Directory Structure

The project organizes its workflows into four clean primitives:

1. **`src/`**: Core shell automation utilities, including:
   - `util.bash`: Central function library providing cluster health checks and the `initializer` routine (`envsubst < ${f} | kubectl apply -f -`).
   - `argoRunner.sh`: Streams templated Application Custom Resources into ArgoCD via gRPC (`argocd app create --name ${THIS_THING} --grpc-web -f -`).
   - `hostr.sh` & `host2bind.sh` & `host2cloudflare.sh`: DNS synchronization utilities for `/etc/hosts`, BIND zone files, and Cloudflare DNS records.
2. **`init/`**: Foundational YAML manifests applied before application deployment (Namespaces, RBAC, Ingress definitions, Secret templates, and StorageClasses).
3. **`argo/`**: Declarative ArgoCD Application manifests and upstream Helm values files for each supported service.
4. **`.argo_overrides/` & `.init_overrides/`**: Operator-defined deep overrides cleanly merged via `yq` at runtime without modifying upstream git tracking.

---

## The Full-Stack Application Catalog

Out of the box, *vigilant-octo-waffle* bundles an enterprise-grade catalog of self-hosted open-source software ready to deploy:

| Application | Role & Technology |
| :--- | :--- |
| **ArgoCD** | Declarative GitOps deployment controller |
| **cert-manager** | Automated TLS lifecycle with `mkcert` (local) or Let's Encrypt (production) |
| **Harbor** | Private enterprise OCI container and Helm chart registry |
| **Keycloak** | Open-source Identity and Access Management (OIDC / OAuth2 / SAML) |
| **OpenBao** | Sovereign secrets management (open-source fork of HashiCorp Vault) |
| **OpenEBS** | Container Attached Storage supporting LVM-LocalPV and NFS ReadWriteMany (RWX) |
| **Supabase** | Full backend suite featuring PostgreSQL, Kong API gateway, and auth |
| **OpenSearch** | Distributed search and observability cluster with Kubernetes Operator |
| **Nextcloud & Collabora** | Sovereign private cloud storage and collaborative document editing |
| **Kubeshark** | Real-time TCP/HTTP/gRPC/DNS packet and API traffic inspection |
| **Prometheus & Grafana** | Complete metrics and alerting infrastructure via `kube-prometheus-stack` |

Each service can be toggled on or off independently inside `.env.enabler`:

```bash
# Enable core infrastructure
BAO_ENABLED=true
HARBOR_ENABLED=true
KEYCLOAK_ENABLED=true
SUPABASE_ENABLED=true

# Disable heavy analytics if conserving memory
OPENSEARCH_ENABLED=false
```

---

## Hands-On: Zero to GitOps in Five Minutes

### 1. Clone and Configure

Clone the repository from [GitHub](https://github.com/DeployCoop/vigilant-octo-waffle):

```bash
git clone https://github.com/DeployCoop/vigilant-octo-waffle.git
cd vigilant-octo-waffle

# Copy default environment variables
cp src/example.env .env
cp src/example.env.enabler .env.enabler
```

### 2. Local CA Certificate Trust (`mkcert`)

To ensure modern browsers trust the locally generated HTTPS endpoints with zero security warnings, install the local root CA:

```bash
mkcert -install
```

*vigilant-octo-waffle* automatically integrates with `cert-manager` to issue trusted TLS certificates for all ingress routes (`*.example.com`).

### 3. Synchronize Local DNS

Update your `/etc/hosts` with the domain aliases for all active services:

```bash
sudo src/hostr.sh
```

*(Alternatively, run `src/host2cloudflare.sh <ips>` if routing through Cloudflare).*

### 4. Launch Cluster (`./up`)

Boot the cluster and watch the GitOps controllers synchronize:

```bash
./up
```

The script tears down any stale cluster state, provisions a fresh KinD cluster with container port-mappings, bootstraps `cert-manager` and NGINX Ingress, initiates ArgoCD, and begins continuous reconciliation of all enabled services.

Check the live status of all ingress endpoints and certificates:

```bash
$ kubectl get ingress -A
NAMESPACE   NAME                       CLASS   HOSTS                  PORTS     AGE
argocd      argocd-server-ingress      nginx   argocd.example.com     80, 443   4m
example     goharbor-example-ingress   nginx   harbor.example.com     80, 443   4m
example     keycloak                   nginx   keycloak.example.com   80, 443   4m
example     openbao-ui                 nginx   baoui.example.com      80, 443   4m
example     supabase-kong              nginx   supa.example.com       80, 443   4m

$ kubectl get certificate -A
NAMESPACE   NAME                          READY   SECRET                        AGE
argocd      argocd-example-tls            True    argocd-example-tls            4m
example     chart-bao-example.com-tls     True    chart-bao-example.com-tls     4m
example     chart-example-keycloak-tls    True    chart-example-keycloak-tls    4m
```

---

## Fine-Grained Overrides via `yq`

When you need to adjust an upstream Helm value or ArgoCD application definition, you don't need to fork the repo or edit core manifests directly. Simply create a file in `.argo_overrides/`:

```yaml
# .argo_overrides/velero/argocd.yaml
spec:
  source:
    helm:
      values: |
        configuration:
          backupStorageLocation:
          - name: minio
            provider: "aws"
            bucket: "k8s-backups"
            config:
              s3Url: http://minio.example.com:9000
```

During initialization, *vigilant-octo-waffle* executes a non-destructive deep merge:

```bash
yq e '. *+ load(".argo_overrides/velero/argocd.yaml")' argo/velero/argocd.yaml
```

This ensures upstream updates can be cleanly pulled from git while your custom local configuration remains intact.

---

## Clean Teardown

When testing is complete, wipe the cluster and release all memory in seconds:

```bash
./src/kindDown.sh
```

---

## Summary & Ecosystem Links

Alongside [Kubash](https://kubash.org), **vigilant-octo-waffle** demonstrates how lightweight shell automation paired with standard Unix utilities (`envsubst`, `yq`, `mkcert`) can deliver developer environments that rival complex commercial developer platforms.

- **GitHub Repository**: [https://github.com/DeployCoop/vigilant-octo-waffle](https://github.com/DeployCoop/vigilant-octo-waffle)
- **Organization**: [DeployCoop](https://github.com/DeployCoop)
- **Primary Architect**: [Joshua Edward McLaughlin Cox](https://github.com/joshuacox)
