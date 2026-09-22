---
title: "Bare-Metal Kubernetes Without the Cloud Tax: Talos Linux, Cilium, and Rook-Ceph"
description: "A comprehensive production blueprint for running sovereign bare-metal Kubernetes clusters with immutable OS, eBPF BGP routing, and distributed NVMe block storage."
pubDate: "2026-09-22"
heroImage: "5.jpg"
tags: ["kubernetes", "devops", "storage", "security", "linux"]
author: "Joshua Edward McLaughlin Cox"
draft: true
---

Running Kubernetes in public cloud environments (AWS EKS, Google GKE, Azure AKS) offers convenience, but at an astronomical markup. Cloud providers charge exorbitant fees for cross-AZ network egress, managed control planes, and provisioned IOPS block storage.

For organizations running steady-state compute or distributed databases, **bare-metal hosting (e.g. Hetzner, Equinix Metal, OVH, or on-premises colocation)** provides 5x to 10x the raw CPU and NVMe performance per dollar.

The historical deterrent to bare-metal Kubernetes was operational toil: OS patching, hardware drift, SSH maintenance, and broken storage networks.

By combining three modern technologies, we can build a completely automated, immutable, and sovereign cluster:

1. **Talos Linux**: An immutable, API-driven Linux distribution designed exclusively for Kubernetes—no SSH, no shell, no package managers.
2. **Cilium**: eBPF-based container networking replacing kube-proxy with wire-speed Layer 7 routing and native BGP peering.
3. **Rook-Ceph**: Distributed, self-healing block and file storage orchestrating raw local NVMe drives.

---

## 1. Architectural Topology

```
+-----------------------------------------------------------------------------------+
|                           BARE-METAL CLUSTER ARCHITECTURE                         |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [ Physical Top-of-Rack Switch / Provider Gateway ] <--- BGP Anycast VIP          |
|                               |                                                   |
|             +-----------------+-----------------+                                 |
|             |                                   |                                 |
|             v                                   v                                 |
|   +-------------------+               +-------------------+                       |
|   |  Talos Node 01    |               |  Talos Node 02    |                       |
|   |  [etcd + Control] |               |  [Worker]         |                       |
|   |  - Cilium (eBPF)  | <--- Mesh --> |  - Cilium (eBPF)  |                       |
|   |  - Rook OSD (NVMe)|               |  - Rook OSD (NVMe)|                       |
|   +-------------------+               +-------------------+                       |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

---

## 2. Bootstrapping Immutable Nodes with Talos Linux

With Talos Linux, all server state is governed by a declarative YAML configuration applied over a secure gRPC API (`talosctl`).

### Step 1: Generate Cluster Secrets and Machine Configs

```bash
# Generate cryptographic secrets for PKI, bootstrap tokens, and certificates
talosctl gen secrets -o secrets.yaml

# Generate control plane and worker configurations
talosctl gen config \
  --with-secrets secrets.yaml \
  sovereign-k8s \
  https://10.0.0.10:6443
```

### Step 2: Configure Machine Hardening Patch (`patch.yaml`)

We patch the generated configuration to disable default kube-proxy (since Cilium replaces it) and prepare disks for Rook-Ceph:

```yaml
cluster:
  network:
    cni:
      name: none
  proxy:
    disabled: true
machine:
  sysctls:
    vm.max_map_count: "262144"
    fs.inotify.max_user_watches: "524288"
  kernel:
    modules:
      - name: br_netfilter
      - name: overlay
      - name: ceph
      - name: rbd
```

Apply the configuration over the network to our bare-metal PXE or ISO booted nodes:

```bash
talosctl apply-config \
  --insecure \
  --nodes 10.0.0.11 \
  --file controlplane.yaml \
  --config-patch @patch.yaml
```

---

## 3. Wire-Speed Networking with Cilium eBPF

Once the control plane boots, we deploy Cilium with `kube-proxy` replacement mode and BGP control plane enabled:

```bash
helm install cilium cilium/cilium \
  --version 1.16.0 \
  --namespace kube-system \
  --set kubeProxyReplacement=true \
  --set k8sServiceHost=10.0.0.10 \
  --set k8sServicePort=6443 \
  --set bgpControlPlane.enabled=true \
  --set l7Proxy=true \
  --set hubble.relay.enabled=true \
  --set hubble.ui.enabled=true
```

### Exposing Ingress via BGP Peering

Instead of paying for expensive cloud load balancers, Cilium advertises Kubernetes `Service` IPs (type `LoadBalancer`) directly to your upstream top-of-rack switches or provider router via BGP:

```yaml
apiVersion: cilium.io/v2alpha1
kind: CiliumBGPPeeringPolicy
metadata:
  name: bgp-upstream-policy
spec:
  nodeSelectors:
    - matchLabels:
        kubernetes.io/os: linux
  virtualRouters:
    - localASN: 64512
      exportPodCIDR: true
      neighbors:
        - peerAddress: "10.0.0.1/32"
          peerASN: 64511
```

---

## 4. Persistent High-IOPS Storage with Rook-Ceph

Running databases (PostgreSQL, ClickHouse, Redis) on bare metal requires enterprise storage features: replication, snapshots, and instant failover without single-node EBS locking delays.

### Deploying the Rook-Ceph Cluster Over Raw NVMe Drives

```yaml
apiVersion: ceph.rook.io/v1
kind: CephCluster
metadata:
  name: rook-ceph
  namespace: rook-ceph
spec:
  cephVersion:
    image: quay.io/ceph/ceph:v18.2.4
  dataDirHostPath: /var/lib/rook
  mon:
    count: 3
    allowMultiplePerNode: false
  storage:
    useAllNodes: true
    useAllDevices: false
    # Automatically claim raw, unformatted NVMe drives on each physical host
    deviceFilter: "^nvme[0-9]n1$"
  healthCheck:
    daemonHealth:
      mon:
        interval: 45s
      osd:
        interval: 60s
```

Create a high-performance replicated block storage class (`CephBlockPool`):

```yaml
apiVersion: ceph.rook.io/v1
kind: CephBlockPool
metadata:
  name: replicated-nvme-pool
  namespace: rook-ceph
spec:
  failureDomain: host
  replicated:
    size: 3
---
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: ceph-block-nvme
provisioner: rook-ceph.rbd.csi.ceph.com
parameters:
  clusterID: rook-ceph
  pool: replicated-nvme-pool
  imageFormat: "2"
  imageFeatures: layering
reclaimPolicy: Delete
allowVolumeExpansion: true
volumeBindingMode: Immediate
```

---

## 5. Economic & Performance Breakdown

Comparing a 3-node bare-metal cluster vs equivalent AWS EKS infrastructure:

| Specification / Cost | AWS EKS (3x i4i.4xlarge)       | Bare-Metal (3x AMD EPYC + 4TB NVMe)        |
| :------------------- | :----------------------------- | :----------------------------------------- |
| **vCPU & Memory**    | 48 vCPUs, 384 GB RAM           | 96 Cores (192 Threads), 768 GB RAM         |
| **Storage**          | 11.25 TB AWS io2 (30,000 IOPS) | 12 TB Local PCIe 4.0 NVMe (1,200,000 IOPS) |
| **Network Egress**   | $0.09 / GB transferred         | 1 Gbps / 10 Gbps unmetered included        |
| **Monthly Estimate** | **~$4,200 / month**            | **~$680 / month**                          |

By running Talos Linux with Cilium and Rook-Ceph, you eliminate the operational overhead traditionally associated with bare metal while achieving enterprise-grade sovereign infrastructure for a fraction of public cloud cost.
