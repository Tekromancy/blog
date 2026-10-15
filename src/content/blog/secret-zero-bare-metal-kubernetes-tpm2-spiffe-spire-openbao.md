---
title: "Secret Zero on Bare-Metal Kubernetes: TPM 2.0 Hardware Attestation with SPIFFE/SPIRE and OpenBao"
description: "Solving the 'Bottom Turtle' Secret Zero problem on sovereign bare-metal Kubernetes clusters using motherboard TPM 2.0 cryptographic attestation, Measured Boot PCRs, SPIFFE/SPIRE X.509 & JWT SVIDs, and OpenBao."
pubDate: "2026-10-15"
updatedDate: "2026-10-15"
heroImage: "25.jpg"
tags: ["kubernetes", "security", "hardware", "devops", "zero-trust", "cryptography"]
author: "Joshua Edward McLaughlin Cox"
draft: false
---

In cloud-managed Kubernetes environments (EKS, GKE, AKS), operators take workload identity for granted: the cloud provider's hypervisor injects a signed instance metadata document (`IMDSv2` / GCP Metadata Server) into the virtual machine, allowing nodes and pods to trade projected tokens for secrets in AWS Secrets Manager or GCP Secret Manager.

When you run **sovereign bare-metal Kubernetes clusters**—such as our [Talos Linux, Cilium, and Rook-Ceph architecture](https://tekromancy.com/blog/bare-metal-kubernetes-talos-cilium-rook-ceph) or [Vigilant Octo Waffle](https://tekromancy.com/blog/vigilant-octo-waffle-kubernetes-gitops)—there is no cloud hypervisor. You immediately confront the foundational infrastructure security paradox known as **The Secret Zero Problem ("The Bottom Turtle")**:

> *To fetch secrets from OpenBao (or HashiCorp Vault), a Kubernetes node or pod needs an initial authentication token. Where do you store that bootstrap token without hardcoding it on an NVMe disk, embedding it inside a GitOps repo, or baking it into a PXE/iPXE boot image where a physical or network attacker can steal it?*

The answer sits soldered directly onto your server's motherboard over the SPI/LPC bus: the **Trusted Platform Module (TPM 2.0)** cryptoprocessor.

Here is the complete production blueprint for eliminating static bootstrap secrets on bare-metal Kubernetes by chaining **TPM 2.0 hardware node attestation (`TPM2_ActivateCredential` + Measured Boot PCRs)**, **SPIFFE/SPIRE cryptographic workload identities**, and **OpenBao**. Experiment with the live **Silicon Root of Trust Attestation Simulator** embedded at the bottom of this dispatch to test fault injection across the chain.

---

## 1. The Hardware-Rooted Chain of Trust

Every enterprise 1U/2U server and modern edge compute node ships with a discrete or firmware **TPM 2.0** cryptoprocessor compliant with the ISO/IEC 11889 specification. Inside its tamper-resistant silicon sits a factory-burned **Endorsement Key (`EK`)** at non-volatile hierarchy handle `0x81010001` whose private key material is generated inside the chip and can **mathematically never be exported**.

By anchoring **SPIRE (the SPIFFE Runtime Environment)** to the TPM 2.0 Endorsement Key and **OpenBao** (the Linux Foundation's open-source fork of Vault) to SPIRE's cryptographic trust bundle, we establish an unbroken, zero-secret chain of trust from physical silicon to application RAM:

![Secret Zero 4-Tier Hardware-to-Cloud Chain of Trust](/images/secret-zero-tpm-spire-openbao-chain.jpg)

```text
+-------------------------------------------------------------------------------+
|          TPM 2.0 -> SPIFFE/SPIRE -> OPENBAO ZERO-SECRET ARCHITECTURE          |
+-------------------------------------------------------------------------------+
|                                                                               |
|  1. SILICON ROOT OF TRUST (Motherboard TPM 2.0 / /dev/tpmrm0)                 |
|     ├── Factory Endorsement Key (EK @ 0x81010001) + Manufacturer EK Cert      |
|     ├── Attestation Key (AK / LDevID) restricted to signing internal quotes   |
|     └── SHA-256 PCR Bank (PCR 0, 2, 4, 7) measuring UEFI, Secure Boot & UKI   |
|                                       |                                       |
|                   TPM2_ActivateCredential + TPM2_Quote Challenge              |
|                                       v                                       |
|  2. NODE ATTESTATION (SPIRE Agent <-> SPIRE Server tpm_devid Plugin)          |
|     ├── Verifies EK/DevID certificate chain against Hardware Inventory CA     |
|     ├── VerifiesAK residency inside EK's TPM via encrypted credential blob    |
|     └── Issues Node SVID: spiffe://tekromancy.internal/spire/agent/tpm/...    |
|                                       |                                       |
|                   Linux Kernel cgroup PID + Kubelet Container SHA-256         |
|                                       v                                       |
|  3. WORKLOAD ATTESTATION (SPIRE CSI Driver tmpfs -> Application Pod)          |
|     ├── Inspects caller socket PID -> cgroup -> ContainerID -> Image Digest   |
|     ├── Mints short-lived (15m) X.509-SVID & (5m) JWT-SVID into RAM tmpfs     |
|     └── Identity: spiffe://tekromancy.internal/ns/prod/sa/payment-engine      |
|                                       |                                       |
|                   OIDC JWT-SVID / mTLS Cert Auth (Zero Static Tokens!)        |
|                                       v                                       |
|  4. DYNAMIC SECRET ENGINE (OpenBao Cluster)                                   |
|     ├── Validates JWT-SVID signature via SPIRE OIDC Discovery Bundle          |
|     └── Synthesizes ephemeral 15m PostgreSQL / Ceph RGW S3 credentials        |
|                                                                               |
+-------------------------------------------------------------------------------+
```

### Why Software-Only Bootstrap Tokens Fail on Bare Metal

Before diving into the TPM 2.0 implementation, consider what happens under three realistic datacenter and edge threat models when a cluster relies on traditional software bootstrap tokens (such as static `kubeadm` join tokens, long-lived Vault AppRole `secret_id` files, or unencrypted disk keys):

1. **Network PXE / iPXE Interception**: A rogue workload or VLAN intruder sends a DHCP/TFTP request to the provisioning server and downloads the unattended OS image or cloud-init/ign config containing the bootstrap secret.
2. **Physical NVMe Drive Theft / Decommissioning Leak**: A drive fails or is pulled from a colocation rack. An attacker mounts the NVMe drive on another server and extracts `/var/lib/kubelet/pki` or `/etc/vault/approle-secret-id`.
3. **Evil Maid / Live-USB Boot Tampering**: Someone with temporary crash-cart or IPMI virtual-media access boots a live Linux ISO or edits the kernel command line (`init=/bin/sh`) to dump secrets while masquerading as the production node.

Chaining TPM 2.0 `EK`/`AK` residency proofs with Measured Boot `PCR` quotes neutralizes all three attacks simultaneously.

---

## 2. Provisioning TPM 2.0 DevID & Measured Boot PCRs

A critical nuance of the TPM 2.0 specification is **privacy separation**: to prevent arbitrary software from using the factory **Endorsement Key (`EK`)** as a global tracking super-cookie, the TPM 2.0 hardware architecture marks the `EK` as a *decrypt-only* storage parent (`TPMA_OBJECT_DECRYPT | TPMA_OBJECT_RESTRICTED`). The `EK` **cannot directly sign** PCR quotes or general data.

Instead, the TPM generates a restricted signing child key—either an **Attestation Key (`AK`)** or an IEEE 802.1AR **Initial/Local Device Identifier (`IDevID` / `LDevID`)**—whose private key is cryptographically wrapped by the `EK`.

![TPM2_ActivateCredential Cryptographic Challenge & PCR Readout](/images/tpm2-activate-credential-handshake.jpg)

### How `TPM2_ActivateCredential` Proves Hardware Residency

How does the remote SPIRE Server verify that an Attestation Key (`AK`) actually lives inside the genuine TPM 2.0 chip represented by the manufacturer's `EK` certificate, rather than being forged in software by an attacker who merely copied the public `EK` cert?

Through the two-step **`TPM2_MakeCredential` / `TPM2_ActivateCredential`** cryptographic protocol:

$$\text{Challenge Blob} = \text{Encrypt}_{\text{EK}_{\text{pub}}}\Big(\text{Secret}_{\text{nonce}} \;\parallel\; \text{HMAC}\big(\text{Name}(\text{AK}_{\text{pub}})\big)\Big)$$

1. **Enrollment / Attestation Request**: The SPIRE Agent on the worker node sends the SPIRE Server its factory `EK` public certificate (`0x01c00002`), its `DevID`/`AK` public template, and a certifying structure (`TPM2_Certify`).
2. **Server Challenge (`MakeCredential`)**: The SPIRE Server validates the `EK` certificate against the silicon vendor's root CA (Infineon, STM, Nuvoton, Intel PTT, or AMD fTPM) and our internal Hardware Inventory CA. It then generates a random symmetric challenge secret and wraps it using the `EK` public key, cryptographically binding the wrapper to the exact cryptographic `Name` (SHA-256 hash of the public area and attributes, including `fixedTPM=1` and `sensitiveDataOrigin=1`) of the `AK`.
3. **Silicon Activation (`TPM2_ActivateCredential`)**: The SPIRE Agent passes the encrypted blob into `/dev/tpmrm0`. The TPM 2.0 chip uses its non-exportable `EK` private key to decrypt the outer wrapper, **internally verifies that the loaded `AK` handle matches the bound `Name` inside the same silicon**, and only then releases the decrypted challenge secret back to the SPIRE Agent.

### Measured Boot & The Golden PCR Bank

Simultaneously, from the first CPU instruction after reset (`CRTM`), the system firmware and bootloader measure every executable stage into the TPM's **Platform Configuration Registers (`PCRs`)**.

Unlike normal CPU registers that can be overwritten (`MOV`), a TPM PCR can **only** be mutated via the irreversible **`TPM2_PCR_Extend`** operation:

$$\text{PCR}_{\text{new}}[i] = \text{SHA-256}\Big(\text{PCR}_{\text{old}}[i] \;\parallel\; \text{SHA-256}(\text{Component})\Big)$$

Because SHA-256 is preimage-resistant, no operating system compromise after boot can "roll back" or forge a valid PCR value if an unauthorized bootloader or kernel parameter was loaded earlier in the boot sequence:

| PCR Index | TCG Measured Component | Security Guarantee & Tamper Detection |
| :---: | :--- | :--- |
| **`PCR 0`** | Core System Firmware (`SRTM`, UEFI BIOS) | Detects SPI flash rootkits (e.g., LoJax, MoonBounce) or unauthorized BIOS downgrades. |
| **`PCR 2`** | Extended / Option ROM Code | Detects malicious PCIe NIC, HBA, or GPU Option ROM firmware injection. |
| **`PCR 4`** | UEFI Boot Manager & Unified Kernel Image (`UKI`) | Detects live-USB booting, kernel substitution, or initramfs tampering (such as Talos `vmlinuz` / squashfs edits). |
| **`PCR 7`** | Secure Boot Policy (`PK`, `KEK`, `db`, `dbx`) | Detects disabling Secure Boot in BIOS or enrolling rogue MOK/platform signing keys. |
| **`PCR 11`** | Unified Kernel Image (`systemd-stub`) Phase Measurements | Binds disk decryption and node identity to specific boot phases (`enter-initrd` vs. `ready`). |

### Provisioning Script: Extracting EK & Provisioning a TPM 2.0 `LDevID`

During initial server burn-in inside an isolated provisioning VLAN, run the following script using `tpm2-tools` (`>= 5.5`) to extract the factory Endorsement Key certificate, generate a hardware-bound `LDevID` keypair inside `/dev/tpmrm0`, and sign its CSR with your internal Hardware Inventory CA:

```bash
#!/usr/bin/env bash
set -euo pipefail

umask 0077
mkdir -p /etc/spire/agent/tpm
cd /etc/spire/agent/tpm

# 1. Extract the factory RSA-2048 or ECC-P256 Endorsement Key Certificate from TPM NVRAM
tpm2_getekcertificate -T device:/dev/tpmrm0 -o ek-cert.der
openssl x509 -inform DER -in ek-cert.der -out ek-cert.pem

echo "[+] Verified TPM 2.0 Manufacturer EK Certificate:"
openssl x509 -in ek-cert.pem -noout -issuer -subject -serial -fingerprint -sha256

# 2. Create the Primary Endorsement Key context at persistent handle 0x81010001
tpm2_createprimary -C e -g sha256 -G rsa2048 -c ek.ctx
tpm2_evictcontrol -C o -c ek.ctx 0x81010001 || true

# 3. Generate a restricted, non-migratable LDevID signing key under the Storage Hierarchy
#    Attributes: fixedtpm|fixedparent|sensitivedataorigin|userwithauth|sign
tpm2_createprimary -C o -g sha256 -G ecc256 -c srk.ctx
tpm2_create \
  -C srk.ctx \
  -g sha256 \
  -G rsa2048:rsassa:null \
  -a "fixedtpm|fixedparent|sensitivedataorigin|userwithauth|sign" \
  -u devid-pub.blob \
  -r devid-priv.blob

# 4. Load the LDevID into the TPM and generate an X.509 CSR via tpm2-openssl provider
tpm2_load -C srk.ctx -u devid-pub.blob -r devid-priv.blob -c devid.ctx
tpm2_evictcontrol -C o -c devid.ctx 0x81020001

NODE_HOSTNAME=$(hostname -f)
openssl req -provider tpm2 -provider default \
  -new -key handle:0x81020001 \
  -subj "/O=Tekromancy Sovereign Infrastructure/CN=${NODE_HOSTNAME}/serialNumber=$(cat /sys/class/dmi/id/product_uuid)" \
  -out devid.csr

# 5. Record the golden SHA-256 Measured Boot PCR baseline for SPIRE Server policy
tpm2_pcrread sha256:0,2,4,7 -o pcr-golden.bin
sha256sum pcr-golden.bin > pcr-golden.sha256
```

Once the provisioning CA signs `devid.csr` into `/etc/spire/agent/tpm/devid.crt`, even if an attacker steals `/etc/spire/agent/tpm/devid-priv.blob` off the disk, that file is **useless**: `devid-priv.blob` is encrypted by the TPM's internal Storage Root Key (`SRK`) seed, which only exists inside that specific physical motherboard's TPM 2.0 silicon.

---

## 3. Configuring SPIRE Server & Agent with the `tpm_devid` Plugin

Instead of ever running `spire-server token generate`, we configure the **SPIRE Server** and **SPIRE Agent** to use the built-in `tpm_devid` NodeAttestor plugin.

### SPIRE Server Configuration (`/etc/spire/server/server.conf`)

In production, the SPIRE Server itself can back its Upstream Authority or root signing keys with a hardware HSM or TPM, while validating worker node `LDevID` and `EK` certificates against your pinned CA bundles:

```hcl
# /etc/spire/server/server.conf
server {
    bind_address = "0.0.0.0"
    bind_port = "8081"
    trust_domain = "tekromancy.internal"
    data_dir = "/var/lib/spire/server"
    log_level = "INFO"
    ca_ttl = "24h"
    default_x509_svid_ttl = "15m"
    default_jwt_svid_ttl = "5m"
    ca_subject = {
        country = ["US"],
        organization = ["Tekromancy Sovereign Mesh"],
        common_name = "spire-root.tekromancy.internal",
    }
}

plugins {
    DataStore "sql" {
        plugin_data {
            database_type = "postgres"
            connection_string = "postgresql://spire@postgres-ha.spire-system.svc:5432/spire?sslmode=verify-full"
        }
    }

    NodeAttestor "tpm_devid" {
        plugin_data {
            # Internal CA that signed each server's LDevID during rack burn-in
            devid_ca_path = "/etc/spire/server/certs/hardware-inventory-ca.pem"
            # Bundle of Infineon, STM, Intel, AMD, and Nuvoton TPM EK Root CAs
            endorsement_ca_path = "/etc/spire/server/certs/tpm-vendor-ek-roots.pem"
        }
    }

    KeyManager "disk" {
        plugin_data {
            keys_path = "/var/lib/spire/server/keys.json"
        }
    }

    Notifier "k8sbundle" {
        plugin_data {
            namespace = "spire-system"
            config_map = "spire-bundle"
        }
    }
}
```

### SPIRE Agent DaemonSet & Configuration (`/etc/spire/agent/agent.conf`)

On each bare-metal Kubernetes worker node, the SPIRE Agent mounts the Linux kernel's in-kernel **TPM Resource Manager (`/dev/tpmrm0`)**—never raw `/dev/tpm0`, as `/dev/tpmrm0` safely multiplexes transient object handles and prevents TPM out-of-memory exhaustion across concurrent calls—and enables container-level verification via the Kubernetes `k8s` workload attestor:

```hcl
# /etc/spire/agent/agent.conf
agent {
    data_dir = "/var/lib/spire/agent"
    log_level = "INFO"
    server_address = "spire-server.spire-system.svc.cluster.local"
    server_port = "8081"
    socket_path = "/run/spire/sockets/agent.sock"
    trust_domain = "tekromancy.internal"
    trust_bundle_path = "/run/spire/bundle/bundle.crt"
}

plugins {
    NodeAttestor "tpm_devid" {
        plugin_data {
            tpm_device_path = "/dev/tpmrm0"
            devid_priv_path = "/etc/spire/agent/tpm/devid-priv.blob"
            devid_pub_path  = "/etc/spire/agent/tpm/devid-pub.blob"
            devid_cert_path = "/etc/spire/agent/tpm/devid.crt"
            ek_cert_path    = "/etc/spire/agent/tpm/ek-cert.der"
        }
    }

    KeyManager "memory" {
        plugin_data {}
    }

    WorkloadAttestor "k8s" {
        plugin_data {
            # Connect to local Kubelet over verified HTTPS port 10250
            kubelet_read_only_port = 0
            kubelet_secure_port = 10250
            token_path = "/var/run/secrets/kubernetes.io/serviceaccount/token"
            kubelet_ca_path = "/var/run/secrets/kubernetes.io/serviceaccount/ca.crt"
            # Enforce strict container image SHA-256 digest matching!
            disable_container_selectors = false
            use_new_container_locator = true
        }
    }

    WorkloadAttestor "unix" {
        plugin_data {
            discover_workload_path = true
        }
    }
}
```

> **Security Detail (`KeyManager "memory"`)**: Notice that on the SPIRE Agent, we configure `KeyManager "memory"` rather than `"disk"`. The SPIRE Agent's own operational X.509 keypair lives exclusively in volatile RAM. If a node loses power or is physically seized, zero agent private keys exist on the filesystem; upon reboot, the agent seamlessly re-attests via `/dev/tpmrm0`.

### Enabling TPM 2.0 Device Passthrough on Talos Linux

If you run immutable **Talos Linux** nodes (as detailed in our [Bare-Metal Kubernetes blueprint](https://tekromancy.com/blog/bare-metal-kubernetes-talos-cilium-rook-ceph)), you can also bind Talos's own `STATE` and `EPHEMERAL` disk encryption partitions directly to TPM 2.0 **PCR 7 / PCR 11** in your Talos machine config so the OS will not even mount `/var` if Secure Boot or the UKI is altered:

```yaml
# talos-tpm-disk-encryption-patch.yaml
machine:
  systemDiskEncryption:
    state:
      provider: luks2
      keys:
        - slot: 0
          tpm:
            checkSecurebootStatusOnEnroll: true
    ephemeral:
      provider: luks2
      keys:
        - slot: 0
          tpm:
            checkSecurebootStatusOnEnroll: true
```

---

## 4. Registering Image-Pinned Workload Identities via SPIRE CSI

Node attestation solves the hardware layer—proving *which physical motherboard* is talking to the control plane. Now we must solve the **Workload Layer**: proving *which exact container process* is requesting secrets on that node.

![Kubernetes Workload Attestation and OpenBao Ephemeral Secret Injection](/images/spire-csi-openbao-ephemeral-flow.jpg)

Suppose a pod runs in the `prod` namespace under the `payment-engine` ServiceAccount. What if an attacker compromises a CI/CD deployment variable or gains `kubectl edit` rights in that namespace and substitutes `alpine:latest` (or injects a malicious debug sidecar) running under the `payment-engine` ServiceAccount to exfiltrate database credentials?

Standard Kubernetes `ServiceAccount` tokens cannot stop this—because a Kubernetes token is bound only to `(Namespace, ServiceAccount)`.

**SPIRE closes this gap entirely.** When an application pod opens a connection to the SPIRE Workload API socket (`/run/spire/sockets/agent.sock`, mounted read-only into the pod via the **SPIFFE CSI Driver**), the SPIRE Agent does not ask the pod who it is. Instead:

1. The Linux kernel provides the unforgeable `SO_PEERCRED` (`PID`, `UID`, `GID`) of the calling process over the Unix domain socket.
2. The SPIRE Agent inspects `/proc/<PID>/cgroup` to determine the container's runtime ID and queries the local Kubelet API (`:10250/pods`) + `unix` binary inspector.
3. SPIRE evaluates the pod against our registered **Selectors**, which pin not only the namespace and ServiceAccount, **but also the immutable container image SHA-256 digest and process UID/binary hash**:

```bash
spire-server entry create \
  -spiffeID spiffe://tekromancy.internal/ns/prod/sa/payment-engine \
  -parentID spiffe://tekromancy.internal/spire/agent/tpm_devid/ef81a904c2d0184b \
  -selector k8s:ns:prod \
  -selector k8s:sa:payment-engine \
  -selector k8s:container-name:payment-engine \
  -selector k8s:pod-image:harbor.tekromancy.internal/prod/payment-engine@sha256:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08 \
  -selector unix:uid:65532 \
  -x509SVIDTTL 900 \
  -jwtSVIDTTL 300
```

If an attacker launches `alpine:latest` or `curlimages/curl` inside that exact same pod or under that exact same `payment-engine` ServiceAccount, its `k8s:pod-image` SHA-256 digest fails the selector check. The SPIRE Agent rejects the Workload API socket request before an SVID is ever minted.

---

## 5. Zero-Secret Authentication to OpenBao

With hardware-attested, image-pinned SVIDs flowing to our pod over an in-memory `tmpfs` CSI socket, we can now eliminate static secrets in **OpenBao** (`openbao/openbao`).

OpenBao supports two cryptographic authentication paths with SPIFFE/SPIRE:
1. **JWT/OIDC Auth (`auth/jwt`)**: The pod requests a 5-minute `JWT-SVID` with audience `openbao.tekromancy.internal` from the SPIRE socket and exchanges it at `/v1/auth/jwt/login`.
2. **TLS Certificate Auth (`auth/cert`)**: The pod presents its 15-minute `X.509-SVID` client certificate over mTLS directly to OpenBao's listener, which validates the URI Subject Alternative Name (`URI SAN: spiffe://tekromancy.internal/ns/prod/sa/payment-engine`) against the SPIRE trust bundle.

### Step 1: Configure OpenBao JWT Auth & Dynamic PostgreSQL Engine

```bash
# 1. Enable JWT/OIDC Auth in OpenBao pointing to SPIRE OIDC Discovery Provider
bao auth enable jwt

bao write auth/jwt/config \
  oidc_discovery_url="https://spire-oidc.tekromancy.internal" \
  oidc_discovery_ca_pem=@/run/spire/bundle/bundle.crt \
  bound_issuer="https://spire-oidc.tekromancy.internal" \
  default_role="payment-engine-role"

# 2. Bind the exact SPIFFE ID and audience to a least-privilege OpenBao policy
bao write auth/jwt/role/payment-engine-role \
  role_type="jwt" \
  bound_audiences="openbao.tekromancy.internal" \
  user_claim="sub" \
  bound_subject="spiffe://tekromancy.internal/ns/prod/sa/payment-engine" \
  token_policies="prod-postgres-dynamic-rw" \
  token_ttl="15m" \
  token_max_ttl="15m"

# 3. Configure OpenBao's Dynamic PostgreSQL Engine to synthesize 15-minute SQL users
bao secrets enable database

bao write database/config/prod-ledger \
  plugin_name="postgresql-database-plugin" \
  allowed_roles="payment-engine-db-role" \
  connection_url="postgresql://{{username}}:{{password}}@postgres.prod.svc:5432/ledger?sslmode=verify-full" \
  username="openbao_root_admin" \
  password="<rotated-immediately-via-bao-rotate-root>"

# Immediately rotate the root database password so no human knows it!
bao write -force database/rotate-root/prod-ledger

bao write database/roles/payment-engine-db-role \
  db_name="prod-ledger" \
  creation_statements="CREATE ROLE \"{{name}}\" WITH LOGIN PASSWORD '{{password}}' VALID UNTIL '{{expiration}}'; GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO \"{{name}}\";" \
  default_ttl="15m" \
  max_ttl="15m"
```

### Step 2: Production Kubernetes Pod Manifest (`payment-engine-deployment.yaml`)

Here is the complete production Kubernetes `Deployment` manifest showing how the **SPIFFE CSI Driver** mounts `/run/spire/sockets/agent.sock` into memory and how the application (or `spiffe-helper` sidecar) continuously exchanges its `JWT-SVID` with OpenBao:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: payment-engine
  namespace: prod
spec:
  replicas: 3
  selector:
    matchLabels:
      app: payment-engine
  template:
    metadata:
      labels:
        app: payment-engine
    spec:
      serviceAccountName: payment-engine
      automountServiceAccountToken: false # No K8s static token needed!
      securityContext:
        runAsNonRoot: true
        runAsUser: 65532
        runAsGroup: 65532
        seccompProfile:
          type: RuntimeDefault
      containers:
        - name: payment-engine
          image: harbor.tekromancy.internal/prod/payment-engine@sha256:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08
          env:
            - name: SPIFFE_ENDPOINT_SOCKET
              value: "unix:///run/spire/sockets/agent.sock"
            - name: BAO_ADDR
              value: "https://openbao.tekromancy.internal:8200"
          volumeMounts:
            - name: spire-agent-socket
              mountPath: /run/spire/sockets
              readOnly: true
          securityContext:
            allowPrivilegeEscalation: false
            readOnlyRootFilesystem: true
            capabilities:
              drop: ["ALL"]
      volumes:
        - name: spire-agent-socket
          csi:
            driver: "csi.spiffe.io"
            readOnly: true
```

Notice `automountServiceAccountToken: false` and `readOnlyRootFilesystem: true`: the pod does not even mount a Kubernetes ServiceAccount token!

### Step 3: Native Go Workload Code (`go-spiffe/v2` → OpenBao)

Inside the `payment-engine` binary, fewer than 40 lines of Go code using [`github.com/spiffe/go-spiffe/v2`](https://github.com/spiffe/go-spiffe) fetch a hardware-attested `JWT-SVID` over the Unix socket and trade it with OpenBao for a 15-minute PostgreSQL connection string:

```go
package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/spiffe/go-spiffe/v2/svid/jwtsvid"
	"github.com/spiffe/go-spiffe/v2/workloadapi"
)

func fetchDynamicPostgresCreds(ctx context.Context) (string, error) {
	// 1. Connect to local SPIRE Agent over CSI Unix Domain Socket
	source, err := workloadapi.NewJWTSource(ctx, workloadapi.WithClientOptions(
		workloadapi.WithAddr(os.Getenv("SPIFFE_ENDPOINT_SOCKET")),
	))
	if err != nil {
		return "", fmt.Errorf("spire workloadapi connect failed: %w", err)
	}
	defer source.Close()

	// 2. Request a short-lived JWT-SVID bound to OpenBao's audience
	svid, err := source.FetchJWTSVID(ctx, jwtsvid.Params{
		Audience: "openbao.tekromancy.internal",
	})
	if err != nil {
		return "", fmt.Errorf("jwt-svid attestation rejected: %w", err)
	}

	// 3. Exchange the JWT-SVID with OpenBao for a 15-minute scoped token
	baoAddr := os.Getenv("BAO_ADDR")
	loginPayload, _ := json.Marshal(map[string]string{
		"role": "payment-engine-role",
		"jwt":  svid.Marshal(),
	})

	resp, err := http.Post(baoAddr+"/v1/auth/jwt/login", "application/json", bytes.NewReader(loginPayload))
	if err != nil || resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("openbao jwt login failed: status=%v err=%v", resp.StatusCode, err)
	}
	defer resp.Body.Close()

	var authResp struct {
		Auth struct {
			ClientToken string `json:"client_token"`
		} `json:"auth"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&authResp); err != nil {
		return "", err
	}

	// 4. Request ephemeral 15-minute PostgreSQL credentials from OpenBao
	req, _ := http.NewRequestWithContext(ctx, "GET", baoAddr+"/v1/database/creds/payment-engine-db-role", nil)
	req.Header.Set("X-Vault-Token", authResp.Auth.ClientToken)

	dbResp, err := (&http.Client{Timeout: 5 * time.Second}).Do(req)
	if err != nil || dbResp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("failed to lease dynamic db creds: %w", err)
	}
	defer dbResp.Body.Close()

	var creds struct {
		Data struct {
			Username string `json:"username"`
			Password string `json:"password"`
		} `json:"data"`
	}
	if err := json.NewDecoder(dbResp.Body).Decode(&creds); err != nil {
		return "", err
	}

	return fmt.Sprintf("postgres://%s:%s@postgres.prod.svc:5432/ledger?sslmode=verify-full",
		creds.Data.Username, creds.Data.Password), nil
}
```

---

## 6. Security & Operational Comparison

| Bootstrap & Identity Architecture | Disk Secret Exposure | Node Clone / NVMe Theft Protection | Bootloader / Evil-Maid Protection | Image Substitution Resistance | Rotation Interval |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Kubernetes `Secret` (Base64 in etcd)** | ❌ High (Plaintext on disk/env) | ❌ None | ❌ None | ❌ None | Manual |
| **Vault AppRole (`role_id` + `secret_id` file)** | ❌ Medium (Static `secret_id` on node) | ❌ Stolen disk authenticates | ❌ None | ❌ None | Manual / CI |
| **K8s Projected SA Token (`TokenRequest`)** | ✅ Low (`tmpfs` memory) | ❌ Stolen kubelet PKI boots as node | ❌ Unmeasured boot | ❌ Namespace + SA only | 1 hour |
| **TPM 2.0 + SPIFFE/SPIRE + OpenBao** | **✅ Zero (Non-exportable Silicon)** | **✅ Hardware-Bound `EK`/`LDevID`** | **✅ PCR 0/2/4/7 Measured Boot** | **✅ Pinned Image SHA-256 + UID** | **5–15 minutes** |

With TPM 2.0 hardware attestation anchored to SPIFFE/SPIRE and OpenBao, **Secret Zero simply ceases to exist as a software artifact**. From bare-metal power-on to SQL transaction, every credential in your cluster is ephemeral, hardware-attested, and cryptographically bound to both the physical motherboard silicon and the immutable container digest.
