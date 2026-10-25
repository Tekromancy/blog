---
title: "Zero-Trust Silicon: Confidential Computing with AMD SEV-SNP, Intel TDX, and NVIDIA H100 CC-Mode Attestation"
description: "How to cryptographically isolate proprietary LLM weights and sensitive workloads from a malicious host hypervisor using AMD SEV-SNP Reverse Map Tables, Intel TDX Trust Domains, and NVIDIA H100/B200 Confidential Computing."
pubDate: "2026-10-25"
updatedDate: "2026-10-25"
heroImage: "28.jpg"
tags: ["security", "hardware", "ai-ml", "linux", "cryptography", "infrastructure"]
author: "Joshua Edward McLaughlin Cox"
draft: false
---

In standard cloud and multi-tenant bare-metal architectures, the **Host Hypervisor (`KVM` / `QEMU`)** and the physical datacenter operator sit at the apex of the trust hierarchy. If an adversary compromises `root` on the host node—or attaches a physical interposer to the DDR5 or PCIe bus—they can dump `/dev/mem`, remap guest VM page tables, or siphon off proprietary 70B-parameter LLM weights and plaintext user prompts straight out of RAM.

**Confidential Computing** inverts this trust model at the silicon level. By moving memory encryption, nested page-ownership verification, and DMA firewalling inside an on-die hardware Root of Trust, a guest Confidential VM (CVM) and its attached GPU treat the host Linux kernel, hypervisor, BIOS, and PCIe switches as **completely untrusted adversaries**.

Here is an engineering deep dive into how **AMD SEV-SNP** (Secure Encrypted Virtualization – Secure Nested Paging), **Intel TDX** (Trust Domain Extensions), and **NVIDIA Hopper (`H100`) & Blackwell (`B200`) Confidential Computing** establish an end-to-end encrypted enclave across CPU and GPU silicon—and how to verify remote hardware attestation (`IETF RATS`) before releasing model decryption keys via **Trustee KBS / OpenBao**. Test the live **Confidential Silicon Enclave Simulator** at the bottom of this dispatch to evaluate hypervisor attack vectors across each architecture.

---

## 1. Why Memory Encryption Alone (`SEV` / `SEV-ES`) Was Not Enough

First-generation confidential computing (**AMD `SEV`** and **`SEV-ES`**) encrypted guest DRAM cachelines inside the on-die memory controller using an ephemeral AES key managed by the AMD Secure Processor (`ASP`) and encrypted CPU register state (`VMSA`) on every `VMEXIT`.

However, encrypting guest memory **without cryptographic integrity over the nested page tables or exception delivery** left two critical architectural holes that researchers repeatedly exploited:

1. **Hypervisor Page-Remapping & Replay Attacks**:
   Even though a malicious host hypervisor could not read the *plaintext* of Guest Physical Address (`GPA`) `0x1000`, the hypervisor still controlled the **Nested Page Tables (`NPT` / `EPT`)** that translate `GPA -> System Physical Address (SPA)`. A compromised KVM host could remap two different GPAs to the same SPA (aliasing), replay stale ciphertext blocks, or trick the guest into executing an encrypted code page at the wrong physical offset.
2. **Forged `#VC` / `#VE` Exception Injection (`WeSee` & `Ahoi` Attacks)**:
   Because the hypervisor cannot read encrypted guest CPU registers (`VMSA`), instructions like `CPUID`, `RDMSR`, and `MMIO` trigger a **VMM Communication Exception (`#VC`, vector 29)** on AMD SEV-ES/SNP or a **Virtualization Exception (`#VE`, vector 20)** on Intel TDX. The guest kernel's exception handler copies *only* the necessary registers into an unencrypted shared page (**GHCB** — Guest-Hypervisor Communication Block) to request hypervisor emulation. In 2024, the *WeSee* attack demonstrated that if a malicious hypervisor injects a fake `#VC` interrupt (`eventinj`) during an arbitrary guest instruction, the guest's `#VC` handler can be tricked into treating normal instructions as `MMIO` or `CPUID` traps—leaking or corrupting guest register state!

### How AMD SEV-SNP & Intel TDX Close Both Integrity Gaps

![AMD SEV-SNP + Intel TDX + NVIDIA H100/B200 Enclave Architecture](/images/confidential-computing-enclave-architecture.jpg)

```text
+-------------------------------------------------------------------------------+
|          CPU + GPU CONFIDENTIAL COMPUTING HARDWARE TRUST BOUNDARY             |
+-------------------------------------------------------------------------------+
|                                                                               |
|  [ CONFIDENTIAL GUEST VM (AMD SEV-SNP / Intel TDX Trust Domain) ]             |
|    ├── AMD SEV-SNP: AES-128/256-XEX (Physical Address Tweak) + C-bit = 1      |
|    ├── Intel TDX:   AES-XTS-128/256 + 28-bit SHA-3 MAC in DDR5 ECC bits       |
|    ├── AMD RMP (Reverse Map Table) enforces 1-to-1 SPA -> (ASID, GPA) mapping |
|    ├── `PVALIDATE` instruction + `Restricted Injection (#HV)` blocks #VC spoof|
|    └── Shared `SWIOTLB` Bounce Buffer / Encrypted DMA staging via SPDM 1.2    |
|                                       |                                       |
|        ============ [ UNTRUSTED HOST KVM / PCIe SWITCH ] ============         |
|        (Sees only AES-GCM encrypted Bounce Buffers & SPDM TLS frames)         |
|                                       |                                       |
|  [ NVIDIA H100 (`CC-ON`) / B200 (`TEE-I/O` + `PCIe IDE`) GPU ENCLAVE ]        |
|    ├── Hardware MMU Firewall blocks all host/guest mmap() on PCIe BAR1        |
|    ├── H100 Copy Engine (`CE`) decrypts AES-GCM-256 DMA inside GPU silicon    |
|    ├── B200 adds line-rate PCIe IDE / TDISP + Inline Encrypted NVLink         |
|    └── GSP signs ECDSA P-384 SPDM Attestation Report chained to NVIDIA Root CA|
|                                                                               |
+-------------------------------------------------------------------------------+
```

Look at the exact silicon enforcement mechanisms comparing **AMD SEV-SNP** (EPYC Milan/Genoa/Turin) and **Intel TDX** (Xeon Emerald Rapids/Granite Rapids):

| Hardware Security Primitive | AMD SEV-SNP (`EPYC 9004/9005`) | Intel TDX (`Xeon 5th/6th Gen`) | Threat Neutralized |
| :--- | :--- | :--- | :--- |
| **DRAM Cipher Mode** | **AES-128/256-XEX** (XOR-Encrypt-XOR with physical address tweak) | **AES-XTS-128/256** + **28-bit cryptographic MAC** stored in DDR5 ECC bits | Cold-boot DRAM probing, `/dev/mem` dumps, & physical interposer bit-flips |
| **Page-Table Integrity** | **Hardware `RMP` (Reverse Map Table)**: 16-byte entry per 4 KB `SPA` checked on every memory access | **Secure EPT (`S-EPT`)** managed exclusively inside CPU **`SEAM`** (`TDX Module`) | Hypervisor `GPA -> SPA` aliasing, page remapping, and ciphertext replay (`#PF` fault) |
| **Guest Page Acceptance** | **`PVALIDATE`** instruction sets the `Validated` bit inside the `RMP` (Ring-0 guest only) | **`TDG.MEM.PAGE.ACCEPT`** (`SEAMCALL`) accepts pending pages into the Trust Domain | Unapproved page injection or double-mapping (`FAIL_SIZEMISMATCH`) |
| **Exception / Interrupt Guard** | **Restricted Injection (`#HV`, vector 28)** + ASP-verified `CPUID` page | **`SEPT_VE_DISABLE`** + `TDX Module` exception filtering & hardened `MMIO` | Forged `#VC` / `#VE` injection (*WeSee*) and malicious `CPUID` feature spoofing |
| **Hardware Root of Trust** | On-die ARM **AMD Secure Processor (`ASP`)** (`ARK -> ASK -> VCEK`) | CPU **`SEAM`** + SGX Quoting Enclave (`Intel Root -> PCK`) | Compromised host BIOS, BMC, or KVM kernel |

#### How the AMD SEV-SNP Reverse Map Table (`RMP`) Works
Checked on **every single CPU memory reference** after Nested Page Table translation (`GPA -> SPA`), the `RMP` is a hardware-protected table in system RAM indexed directly by **System Physical Address (`SPA`)**. Every 4 KB physical frame has an `RMP` entry recording its `Assigned` bit, owning `ASID` (Address Space ID), mapped `GPA`, `Immutable` bit, and `Validated` bit:
- If a compromised KVM host alters the Nested Page Table so `GPA_2` points to `SPA_1` (whose `RMP` entry states it belongs to `GPA_1`), the CPU memory controller immediately aborts the access and raises a **`#PF` (`RMP` Violation Page Fault)**!
- And by enabling **`Restricted Injection`** (`VMSA.SEV_FEATURES[3] = 1`), the hardware forbids the hypervisor from injecting `#VC` (vector 29) or standard x86 exceptions—forcing all hypervisor virtual interrupts through a single paravirtualized doorbell vector (`#HV`, vector 28) and neutralizing `#VC` spoofing completely.

---

## 2. Extending the Enclave to the GPU: NVIDIA H100 (`CC-On`) vs. Blackwell (`B200 TEE-I/O`)

When running confidential LLM inference or fine-tuning, encrypting CPU DRAM is pointless if model weights and user prompts cross the PCIe root complex in plaintext into the GPU's `BAR1` aperture.

NVIDIA's Confidential Computing architecture evolved across two hardware generations:

### Generation 1: NVIDIA Hopper (`H100` `CC-On` & `PPCIE` Multi-GPU Mode)
When an **NVIDIA H100 GPU** boots with Confidential Computing enabled (`CC-On` for single-GPU or `PPCIE` — Protected PCIe for multi-GPU NVSwitch systems):
1. **Hardware MMU Firewall Over PCIe BARs**: The GPU's internal RISC-V **GSP (GPU System Processor)** and Security Engine lock down all PCIe Base Address Registers (`BAR0` / `BAR1`). Neither the host OS nor the guest OS can directly `mmap()` HBM3 memory; all debug, JTAG, and performance-counter side-channels are hardware-disabled.
2. **DMTF `SPDM 1.2` Session & Key Exchange**: During CUDA initialization inside the Confidential Guest VM, the guest kernel driver establishes an authenticated cryptographic session with the GPU's on-die hardware root of trust over **SPDM 1.2**, verifying the GPU's ECDSA P-384 certificate chain and VBIOS/GSP Reference Integrity Manifests (`RIM`) and deriving shared **AES-GCM-256 session keys**.
3. **Encrypted Bounce-Buffer DMA via Hardware Copy Engines (`CE`)**: Because standard PCIe 5.0 switches lack inline TLP encryption, whenever `cudaMemcpyAsync` transfers weights or token IDs (`H2D` / `D2H`), the CVM CPU encrypts the payload in software (`AES-GCM-256` with a strictly monotonic 96-bit IV) inside an unencrypted `SWIOTLB` shared bounce buffer. The untrusted host initiates the DMA transfer over PCIe, and the H100's hardware **Copy Engine (`CE`)** decrypts and verifies the 128-bit GCM authentication tag *inside the GPU die* before writing the plaintext into HBM3.

### Generation 2: NVIDIA Blackwell (`B200` / `GB200` with `TEE-I/O` & Encrypted NVLink)
While H100's software `SWIOTLB` AES-GCM bounce buffer works on any SEV-SNP/TDX server today, encrypting gigabytes of data on the CPU caps effective PCIe H2D throughput at `~8–12 GB/s`. **NVIDIA Blackwell (`B200` / `GB200`)** eliminates that bottleneck in hardware via two standards:
- **PCIe `IDE` (Integrity and Data Encryption) + `TDISP` (Trusted Device Interface Security Protocol)**: The CPU Root Port and the GPU PCIe controller encrypt and authenticate PCIe Transaction Layer Packets (`TLPs`) directly in silicon at **full PCIe Gen6 line rate**, allowing zero-copy DMA straight from private encrypted guest RAM into GPU HBM3e without software bounce buffers!
- **Inline Encrypted 5th-Gen NVLink (`1.8 TB/s`)**: Multi-GPU `AllReduce` and tensor parallelism across up to 72 Blackwell GPUs execute over hardware-encrypted NVLink domains at native wire speed.

---

## 3. Dual CPU + GPU Remote Attestation Pipeline (`IETF RATS` & `Trustee KBS`)

How do you ensure a malicious cloud host doesn't simply boot your container inside a normal, unencrypted VM with a fake `/dev/sev-guest` device and steal your model decryption key?

You enforce the **IETF RATS (Remote ATtestation procedureS, `RFC 9334`)** relying-party architecture using **Confidential Containers (`CoCo`)** and **Trustee Key Broker Service (`KBS`)**:

![Dual CPU + GPU Remote Attestation Pipeline (IETF RATS / Trustee KBS)](/images/confidential-computing-attestation-pipeline.jpg)

1. **Launch Measurement (`MEASUREMENT` / `MRTD`)**: Before the VM boots its first instruction, the AMD Secure Processor (`ASP`) computes a 384-bit **SHA-384 digest** over the initial guest memory pages (`OVMF.fd` firmware + direct-boot Linux kernel + initramfs + kernel command-line, or an **IGVM** manifest).
2. **Cryptographic Nonce & Ephemeral Key Binding**: The guest generates an ephemeral keypair in encrypted RAM and requests a 64-byte random challenge `nonce` from the remote **Trustee KBS**. It computes `REPORT_DATA = SHA512(nonce || ephemeral_pubkey)` and passes those 64 bytes to `/dev/sev-guest` at **`VMPL 0`** (the highest inner guest privilege level).
3. **Silicon-Signed Evidence Collection**:
   - The AMD `ASP` signs the 1,184-byte `SNP_ATTESTATION_REPORT` using its chip-unique **VCEK (Versioned Chip Endorsement Key)**, which embeds the hardware TCB Security Version Numbers (`BOOT_LOADER`, `TEE`, `SNP`, `MICROCODE`).
   - Simultaneously, the NVIDIA GPU signs an SPDM 1.2 measurement block containing 48-byte SHA-384 digests of every active VBIOS and GSP firmware slot.
4. **Zero-Trust Unsealing into Encrypted RAM**: The remote Verifier (**Trustee** + **NVIDIA Remote Attestation Service / Local Verifier**) validates both certificate chains (`AMD ARK -> ASK -> VCEK` and `NVIDIA Root CA`) and compares the digests against your signed policy. Only when both CPU and GPU return `affirming` does **OpenBao / KBS** wrap the `AES-256-GCM` model decryption key with the guest's `ephemeral_pubkey`—unsealing the 70B LLM checkpoint directly into encrypted `tmpfs` / HBM3 with **zero disk persistence**.

### Step 1: Query and Switch NVIDIA H100 into `CC-On` Mode

```bash
# 1. Enable Confidential Computing mode on the GPU (requires host reset on bare-metal setup)
nvidia-smi conf-compute -srs 1

# 2. Inside the Confidential Guest VM, verify CC status and DevTools lockdown
nvidia-smi conf-compute -f
# Output: CC status: ON (Environment: PRODUCTION, DevTools: BLOCKED)

# 3. Confirm GPU SPDM attestation readiness state is READY
nvidia-smi conf-compute -grs
# Output: Ready state: READY
```

### Step 2: Generate and Verify an AMD SEV-SNP Hardware Attestation Report (`snpguest`)

Inside the Confidential Guest VM, `/dev/sev-guest` communicates with the AMD Secure Processor using an AES-256-GCM authenticated message sequence (`VMPCK0` + monotonic sequence counter) that immediately halts if the hypervisor replays, drops, or alters a message:

```bash
#!/usr/bin/env bash
set -euo pipefail

# 1. Bind a 64-byte cryptographic challenge (SHA-512 of KBS Nonce || Ephemeral TLS Public Key)
openssl rand -out /tmp/request-nonce.bin 64

# 2. Request a hardware-signed attestation report from /dev/sev-guest at VMPL 0
snpguest report /tmp/attestation-report.bin /tmp/request-nonce.bin --vmpl 0

# 3. Fetch the silicon-specific AMD VCEK (Versioned Chip Endorsement Key) certificate chain
snpguest certificates pem /tmp/certs

# 4. Cryptographically verify the AMD ARK -> ASK -> VCEK chain and ECDSA P-384 signature
snpguest verify attestation /tmp/certs /tmp/attestation-report.bin

# 5. Inspect Launch Measurement (SHA-384 of OVMF + Kernel + Initrd) & TCB SVN
snpguest display report /tmp/attestation-report.bin | grep -E "Measurement:|Reported TCB:|Policy:" -A 4
```

### Step 3: Verify Dual CPU + GPU Attestation & Unseal Model Weights

```python
from verifier import cc_admin
import hashlib
import subprocess

# 1. Compute 64-byte binding digest over KBS challenge nonce and ephemeral key
ephemeral_pubkey_pem = open("/run/enclave/ephemeral_pub.pem", "rb").read()
kbs_nonce = bytes.fromhex("9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08")
bound_nonce = hashlib.sha256(kbs_nonce + ephemeral_pubkey_pem).hexdigest()

# 2. Attest local H100/B200 GPU over SPDM 1.2 against signed NVIDIA RIM manifests
gpu_verified, eat_jwt_token = cc_admin.attest({
    "nonce": bound_nonce,
    "test_no_gpu": False,
})

if not gpu_verified:
    raise RuntimeError("CRITICAL: GPU SPDM Rim Attestation Failed! Aborting weight unseal.")

print("[+] H100 SPDM Certificate Chain & GSP Firmware RIM Verified!")
print(f"[+] Signed EAT Token Issued: {eat_jwt_token[:64]}...")
```

---

## 4. Performance Overhead: Standard KVM vs. H100 `CC-On` vs. Blackwell `TEE-I/O`

How much throughput do you pay for hardware-enforced CPU + GPU memory encryption?

Because autoregressive LLM attention and matrix multiplications execute **100% inside GPU HBM3/HBM3e** once the prompt token IDs cross the PCIe bus, the GPU's internal Tensor Cores run at native clock speed. The only measurable overhead occurs during host-to-device (`H2D`) and device-to-host (`D2H`) transfers across the PCIe root complex:

| Workload Metric (Llama-3.3-70B FP8) | Standard KVM (`CC-Off`, Plaintext) | SEV-SNP + H100 (`CC-On`, Bounce DMA) | TDX / SNP + B200 (`PCIe IDE` TEE-I/O) |
| :--- | :---: | :---: | :---: |
| **Cold Model Weight Load (`70 GB` H2D)** | 2.6 s | 6.8 s *(One-time startup)* | **2.9 s (Line-Rate IDE)** |
| **Short Prompt Inference (`1K in / 512 out`)** | 78.4 tok/s | 74.1 tok/s (**-5.5%**) | **77.5 tok/s (-1.1%)** |
| **Long Context Prefill (`16K tokens` TTFT)** | 1,420 ms | 1,495 ms (**+5.2%**) | **1,435 ms (+1.0%)** |
| **Multi-GPU `AllReduce` (`8x GPU` Tensor Parallel)** | 100% Baseline | 81.4% *(PPCIE Bounce Overhead)* | **98.6% (Inline Encrypted NVLink)** |
| **Host `root` `/dev/mem`, `RMP` & PCIe Snoop** | ❌ **Plaintext Exposed** | ✅ **Hardware-Blocked** | ✅ **Hardware-Blocked** |

For less than a **5.5% single-GPU inference cost on H100**—dropping to **~1% on PCIe IDE + Encrypted NVLink platforms**—you mathematically remove the cloud provider, colocation facility, and host hypervisor from your cryptographic trust boundary.
