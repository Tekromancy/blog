---
title: "Secret Zero on Bare-Metal Kubernetes: TPM 2.0 Hardware Attestation with SPIFFE/SPIRE and OpenBao"
description: "Solving the 'Bottom Turtle' Secret Zero problem on sovereign bare-metal Kubernetes clusters using motherboard TPM 2.0 cryptographic attestation, SPIFFE/SPIRE X.509 SVIDs, and OpenBao."
pubDate: "2026-10-14"
updatedDate: "2026-10-14"
heroImage: "25.jpg"
tags: ["kubernetes", "security", "hardware", "devops", "zero-trust"]
author: "Joshua Edward McLaughlin Cox"
draft: true
---

In cloud-managed Kubernetes environments (EKS, GKE, AKS), operators take workload identity for granted: the cloud provider's hypervisor injects a signed instance identity document into the node, allowing pods to trade projected service account tokens for secrets in AWS Secrets Manager or GCP Secret Manager.

When you run **sovereign bare-metal Kubernetes clusters**—such as our [Talos Linux, Cilium, and Rook-Ceph architecture](https://tekromancy.com/blog/bare-metal-kubernetes-talos-cilium-rook-ceph) or [Vigilant Octo Waffle](https://tekromancy.com/blog/vigilant-octo-waffle-kubernetes-gitops)—there is no cloud hypervisor. You immediately confront the classic infrastructure security paradox known as **The Secret Zero Problem ("The Bottom Turtle")**:

> *To fetch secrets from OpenBao (or HashiCorp Vault), a Kubernetes node or pod needs an authentication token. Where do you store that initial bootstrap token without hardcoding it on disk or baking it into a PXE boot image where an attacker can steal it?*

The answer sits soldered directly onto your server's motherboard: the **Trusted Platform Module (TPM 2.0)** cryptoprocessor.

Here is the complete production blueprint for eliminating static bootstrap secrets on bare-metal Kubernetes by chaining **TPM 2.0 hardware node attestation**, **SPIFFE/SPIRE cryptographic workload identities**, and **OpenBao**.

---

## 1. The Hardware-Rooted Chain of Trust

Every enterprise server and modern mini-PC ships with a discrete or firmware **TPM 2.0** chip containing a factory-burned **Endorsement Key (`EK`)** whose private half can **never leave the tamper-resistant silicon**.

By combining the TPM 2.0 Endorsement Key with **SPIRE (the SPIFFE Runtime Environment)** and **OpenBao** (the Linux Foundation's open-source fork of Vault), we establish an unbroken cryptographic chain from silicon to application memory:

```text
+-------------------------------------------------------------------------------+
|          TPM 2.0 -> SPIFFE/SPIRE -> OPENBAO ZERO-SECRET ARCHITECTURE          |
+-------------------------------------------------------------------------------+
|                                                                               |
|  1. SILICON ROOT OF TRUST (Motherboard TPM 2.0 / /dev/tpmrm0)                 |
|     └── Factory Endorsement Key (EK) + PCR 0-7 Measured Boot Hashes           |
|     └── Proves physical hardware identity & uncompromised UEFI/Kernel boot    |
|                                       |                                       |
|                   TPM Quote & Credential Activation Challenge                 |
|                                       v                                       |
|  2. NODE ATTESTATION (SPIRE Agent <-> SPIRE Server TPM DevID Plugin)          |
|     └── Verifies TPM EK certificate against hardware inventory CA             |
|     └── Issues Node Identity: spiffe://tekromancy.internal/spire/agent/tpm/...|
|                                       |                                       |
|                   Kubernetes Kubelet / cgroup / Image SHA Verification        |
|                                       v                                       |
|  3. WORKLOAD ATTESTATION (Unix Domain Socket CSI Driver -> Application Pod)   |
|     └── Issues short-lived (15m) X.509-SVID & JWT-SVID into memory            |
|     └── Identity: spiffe://tekromancy.internal/ns/prod/sa/payment-engine      |
|                                       |                                       |
|                   mTLS / OIDC JWT Authentication (Zero Static Tokens!)        |
|                                       v                                       |
|  4. DYNAMIC SECRET ENGINE (OpenBao Cluster)                                   |
|     └── Validates SPIFFE SVID & returns ephemeral 15m PostgreSQL/S3 creds     |
|                                                                               |
+-------------------------------------------------------------------------------+
```

---

## 2. Provisioning TPM 2.0 DevID & Measured Boot PCRs

During initial server racking in a trusted provisioning VLAN, we enroll each bare-metal node's TPM 2.0 chip by extracting its **Endorsement Key (`EK`) Public Certificate** (`nvread 0x1c00002`) or provisioning a TPM **Initial Device Identifier (`IDevID` / `LDevID`)** signed by our internal Hardware Inventory CA.

Simultaneously, we record the golden **Platform Configuration Register (`PCR`)** values:
- **`PCR 0` & `PCR 2`**: Core UEFI BIOS firmware and Option ROM hashes.
- **`PCR 4`**: UEFI Boot Manager and Unified Kernel Image (UKI) hash.
- **`PCR 7`**: Secure Boot policy and enrolled `PK`/`KEK`/`db` signing certificates.

If an attacker gains physical access to the server rack, plugs in a live USB, or modifies the kernel command line (`init=/bin/sh`), **`PCR 4` and `PCR 7` change immediately**—causing the TPM 2.0 quote verification on the SPIRE Server to fail and denying the node cluster credentials.

### Extracting the TPM 2.0 EK Certificate on Linux

```bash
#!/usr/bin/env bash
set -euo pipefail

# Read the factory RSA-2048 Endorsement Key Certificate from TPM NVRAM
tpm2_getekcertificate -o /etc/spire/ek-cert.der
openssl x509 -inform DER -in /etc/spire/ek-cert.der -out /etc/spire/ek-cert.pem

# Inspect the hardware manufacturer and serial fingerprint
openssl x509 -in /etc/spire/ek-cert.pem -noout -text | grep -E "Issuer:|Subject:|Serial"
```

---

## 3. Configuring SPIRE Server & Agent with the `tpm_devid` Plugin

Instead of using insecure join tokens (`spire-server token generate`), we configure the **SPIRE Server** and **SPIRE Agent** to perform cryptographic **Credential Activation (`TPM2_ActivateCredential`)**:

1. The SPIRE Agent sends its TPM Endorsement Key public cert and Attestation Key (`AK`) public area to the SPIRE Server.
2. The SPIRE Server encrypts a secret challenge inside a structure bound to the Attestation Key's cryptographically verified residence inside the same TPM as the Endorsement Key.
3. Only the genuine physical TPM 2.0 chip can execute `TPM2_ActivateCredential` to decrypt the challenge and return the signed PCR quote.

```hcl
# /etc/spire/server/server.conf
server {
    bind_address = "0.0.0.0"
    bind_port = "8081"
    trust_domain = "tekromancy.internal"
    data_dir = "/var/lib/spire/server"
    ca_ttl = "24h"
    default_x509_svid_ttl = "15m"
    default_jwt_svid_ttl = "5m"
}

plugins {
    NodeAttestor "tpm_devid" {
        plugin_data {
            devid_ca_path = "/etc/spire/server/certs/hardware-inventory-ca.pem"
            endorsement_ca_path = "/etc/spire/server/certs/tpm-vendor-ek-roots.pem"
        }
    }

    KeyManager "disk" {
        plugin_data {
            keys_path = "/var/lib/spire/server/keys.json"
        }
    }
}
```

And on each bare-metal Kubernetes worker node (`/etc/spire/agent/agent.conf`), the SPIRE Agent accesses the kernel TPM Resource Manager (`/dev/tpmrm0`) and verifies workload containers via the Kubernetes `k8s_psat` / `k8s` workload attestor:

```hcl
# /etc/spire/agent/agent.conf
agent {
    data_dir = "/var/lib/spire/agent"
    server_address = "spire-server.spire-system.svc.cluster.local"
    server_port = "8081"
    socket_path = "/run/spire/sockets/agent.sock"
    trust_domain = "tekromancy.internal"
}

plugins {
    NodeAttestor "tpm_devid" {
        plugin_data {
            tpm_device_path = "/dev/tpmrm0"
            devid_priv_path = "/etc/spire/agent/devid-priv.blob"
            devid_pub_path  = "/etc/spire/agent/devid-pub.blob"
            devid_cert_path = "/etc/spire/agent/devid.crt"
            ek_cert_path    = "/etc/spire/agent/ek-cert.der"
        }
    }

    WorkloadAttestor "k8s" {
        plugin_data {
            kubelet_read_only_port = 10255
            # Enforce strict container image SHA-256 digest matching!
            disable_container_selectors = false
        }
    }
}
```

---

## 4. Registering Image-Pinned Workload Identities

Even if a pod runs in the `production` namespace under the `payment-engine` ServiceAccount, what if an attacker compromises a deployment manifest to run `alpine:latest` under that same ServiceAccount to steal secrets?

Because SPIRE inspects the Linux kernel `cgroup` and Kubelet container status of the exact process calling `/run/spire/sockets/agent.sock`, we can bind the SPIFFE ID not only to the namespace and ServiceAccount, **but also to the immutable container image SHA-256 digest and binary UID**:

```bash
spire-server entry create \
  -spiffeID spiffe://tekromancy.internal/ns/prod/sa/payment-engine \
  -parentID spiffe://tekromancy.internal/spire/agent/tpm_devid/node-01-ek-fp \
  -selector k8s:ns:prod \
  -selector k8s:sa:payment-engine \
  -selector k8s:container-image:harbor.tekromancy.internal/prod/payment-engine@sha256:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08 \
  -x509SVIDTTL 900
```

Now, if *any* other container image or unapproved binary attempts to request the SVID, the SPIRE Agent rejects the unix socket call before a certificate is ever minted.

---

## 5. Authenticating Directly to OpenBao Without Static Secrets

Finally, we configure **OpenBao** to trust SPIRE's OIDC Discovery Provider (or X.509 Root CA bundle) so pods can exchange their 5-minute `JWT-SVID` (`spiffe://tekromancy.internal/ns/prod/sa/payment-engine`) directly for dynamic database credentials:

```bash
# 1. Enable JWT/OIDC Auth in OpenBao pointing to SPIRE OIDC Discovery
bao auth enable jwt

bao write auth/jwt/config \
  oidc_discovery_url="https://spire-oidc.tekromancy.internal" \
  oidc_discovery_ca_pem=@/etc/spire/bundle.crt \
  default_role="payment-engine-role"

# 2. Bind the exact SPIFFE ID and audience to an OpenBao least-privilege policy
bao write auth/jwt/role/payment-engine-role \
  role_type="jwt" \
  bound_audiences="openbao.tekromancy.internal" \
  user_claim="sub" \
  bound_subject="spiffe://tekromancy.internal/ns/prod/sa/payment-engine" \
  token_policies="prod-postgres-dynamic-rw" \
  token_ttl="15m" \
  token_max_ttl="15m"
```

### Zero-Secret Security Comparison

| Bootstrap Method | Disk Secret Exposure | Node Clone / Theft Protection | Image Tamper Resistance | Rotation Interval |
| :--- | :---: | :---: | :---: | :---: |
| **Kubernetes `Secret` (Base64 etcd)** | High (Plaintext in etcd/env) | ❌ None | ❌ None | Manual |
| **K8s ServiceAccount Token (`TokenRequest`)** | Low (Tmpfs memory) | ❌ Stolen disk boots as node | ❌ Namespace/SA only | 1 hour |
| **TPM 2.0 + SPIFFE/SPIRE + OpenBao** | **Zero (Non-exportable Silicon)** | **✅ Hardware-Bound + PCRs** | **✅ Pinned Image SHA-256** | **5–15 minutes** |

With TPM 2.0 hardware attestation anchored to SPIFFE/SPIRE and OpenBao, there is **no Secret Zero on disk anywhere in the cluster**—from bare-metal power-on to database connection, every credential is ephemeral, hardware-attested, and cryptographically bound.
