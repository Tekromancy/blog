---
title: "Silicon Ghosts: Microarchitectural Branch History Injection (BHI), Data Memory-Dependent Prefetchers (DMP/GoFetch), and Constant-Time Compiler Defenses"
description: "Why classic retpolines and eIBRS failed to stop Native Branch History Injection (CVE-2024-2201) and Data Memory-Dependent Prefetchers (GoFetch/Augury)—and how hardware BHI_DIS_S, lfence barriers, and LLVM Speculative Load Hardening (SLH) seal the microarchitectural leak."
pubDate: "2026-11-08"
updatedDate: "2026-11-08"
heroImage: "42.jpg"
tags: ["security", "hardware", "linux", "kernel", "cryptography"]
author: "Joshua Edward McLaughlin Cox"
draft: true
---

When **Spectre v2 (`Branch Target Injection`, `CVE-2017-5715`)** was disclosed in 2018, CPU architects and kernel engineers believed they had two permanent fixes:
1. **Software `Retpolines`**: Replace indirect jumps/calls (`jmp *%rax`) with a `call` + `ret` return-stack-buffer (`RSB`) trap that stalls speculative execution inside an infinite `pause; lfence` loop.
2. **Hardware `eIBRS` (`Enhanced Indirect Branch Restricted Speculation`, Intel Cascade Lake+ / AMD `AutoIBRS`)**: Hardware isolation bit in `IA32_SPEC_CTRL` intended to prevent unprivileged Ring-3 user code from poisoning the Indirect Branch Predictor (`IBP`) used by Ring-0 kernel code.

Then came **Branch History Injection (`BHI` / `Spectre-BHB`, `CVE-2022-0001`)** and **InSpectre Gadget (`Native BHI`, `CVE-2024-2201`)**—alongside a completely different class of silicon side-channel: **Data Memory-Dependent Prefetchers (`DMP`, `Augury` / `GoFetch`)** that break classic "constant-time" cryptographic code *without executing a single secret-dependent branch or array lookup*!

Here is the microarchitectural anatomy of both attacks—and how modern Linux kernels (`6.8+`–`6.12+`) and compilers (`LLVM Speculative Load Hardening`) defend against them.

---

## 1. How Native Branch History Injection (`BHI`, `CVE-2024-2201`) Bypasses `eIBRS`

Why did hardware `eIBRS` fail to stop a Ring-3 attacker from steering speculative indirect calls inside the Ring-0 Linux kernel?

Because `eIBRS` only tags entries in the **Branch Target Buffer (`BTB`)** by privilege mode (`User` vs. `Supervisor`). It **does NOT flush or isolate the global Branch History Buffer (`BHB`)** when transitioning from Ring-3 to Ring-0 on a `syscall`!

```text
+-----------------------------------------------------------------------------------+
|         BRANCH HISTORY INJECTION (BHI / CVE-2024-2201) EXPLOIT PIPELINE           |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [ RING-3 ATTACKER PROCESS ]                                                      |
|    1. Executes a sequence of ~194 taken conditional/direct branches in userspace  |
|       to craft a specific 388-bit rolling hash inside the CPU's global            |
|       **Branch History Buffer (`BHB`)**.                                          |
|    2. Invokes a standard system call (`syscall` -> Ring-3 to Ring-0 transition)   |
|                                       |                                           |
|  -------------------------------------+-----------------------------------------  |
|                                       v                                           |
|  [ RING-0 LINUX KERNEL (`eIBRS` Enabled, `BTB` Tagged Supervisor-Only) ]          |
|    3. `eIBRS` blocks Ring-3 `BTB` targets, BUT the Indirect Branch Predictor      |
|       computes its lookup index by XOR-folding:                                   |
|         Index = Hash(Instruction_Pointer, Global_BHB_State)                       |
|    4. Poisoned `Global_BHB_State` causes a valid Ring-0 indirect call             |
|       (`call *ops->ioctl`) to speculatively jump to a **valid Ring-0 Disclosure   |
|       Gadget** (`InSpectre Gadget`) already resident in the Supervisor BTB!       |
|    5. Gadget speculatively loads `/etc/shadow` / kernel heap byte -> touches      |
|       `Flush+Reload` shared page cacheline -> Attacker measures L3 hit time!      |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

Inside modern Intel and ARM CPUs, the Indirect Branch Predictor selects which target address to predict by hashing the current instruction address (`RIP`) together with the **Branch History Buffer (`BHB`)**—a shift register recording the source and destination bits of the last `66` to `194` taken branches.
- Even though `eIBRS` prevents the kernel from jumping to a *userspace* address, the kernel itself contains thousands of valid indirect call targets.
- By brute-forcing or symbolically solving the BHB shift-register polynomial in Ring-3 right before executing `syscall`, the attacker collides the predictor index so that a kernel indirect call (`call *f_op->unlocked_ioctl`) speculatively jumps to an existing **Ring-0 Disclosure Gadget** (`movzbl (%rdi), %eax; shl $12, %rax; mov (%rbx,%rax,1), %rcx`) that leaks arbitrary physical memory (`direct map`) into the L1/L3 cache timing channel at **3.5 KB/sec**!

---

## 2. Why Data Memory-Dependent Prefetchers (`DMP` / `GoFetch`) Break Constant-Time Cryptography

For twenty years, cryptographic engineers followed three strict rules to write **Constant-Time Code** immune to cache-timing attacks:
1. Never branch (`if (secret_bit)`) on secret data.
2. Never use secret data as an array index (`table[secret_byte]`).
3. Never pass secret data to variable-latency instructions (such as hardware integer division `idiv`).

**Data Memory-Dependent Prefetchers (`DMP`)**—found in Apple M1/M2/M3 silicon and Intel Raptor Lake / Core Ultra (`ip_pfetch`)—violate the foundational assumption of constant-time programming: **the hardware cache controller inspects the *data values* loaded from L1 cache, and if a 64-bit value inside a register or cacheline *looks like a valid virtual memory pointer*, the DMP autonomously dereferences it and prefetches that address into L2 cache!**

### How `GoFetch` Exploits Constant-Time Pointer Arithmetic

Consider a constant-time Diffie-Hellman, RSA, or Post-Quantum (`ML-KEM` / `Kyber` or `ML-DSA` / `Dilithium`) implementation that mixes an attacker-chosen input with a secret key share. Even if the code never dereferences the intermediate state:
1. The attacker crafts chosen ciphertexts/inputs so that when intermediate value $V = f(\text{input}, \text{secret\_bits})$ is written into an array in memory:
   - If `secret_bits == 0x01`, $V$ equals `0x00007fff80041000` (a valid virtual pointer inside a probe array!).
   - If `secret_bits != 0x01`, $V$ equals a non-canonical 64-bit integer (`0x9482a10049102210`).
2. When the cryptographic routine reads the array sequentially, the **hardware DMP scans the 64-bit data payload of the cacheline**, mistakes $V = \text{0x00007fff80041000}$ for a pointer inside a struct/array of pointers, and **prefetches `*(0x00007fff80041000)` into the cache**, leaking `secret_bits` to a `Prime+Probe` observer!

---

## 3. Kernel & Compiler Defenses: `BHI_DIS_S`, Software BHB Clearing, `DIT`/`DOIT`, and LLVM `SLH`

How do we defend production bare-metal Linux servers and cryptographic libraries against both `Native BHI` (`CVE-2024-2201`) and `DMP` (`GoFetch`)?

### 1. Kernel `BHI_DIS_S` (`IA32_SPEC_CTRL` Bit 10) & `clear_bhb_loop`

On Intel Alder Lake / Sapphire Rapids / Emerald Rapids / Granite Rapids, Linux 6.8+ enables hardware **`SPEC_CTRL_BHI_DIS_S`** (`Bit 10` of `MSR_IA32_SPEC_CTRL`, `0x48`), which prevents the Branch History Buffer (`BHB`) state accumulated in Ring-3 from influencing indirect branch predictions in Ring-0 (`Supervisor` mode). On older Cascade Lake / Ice Lake CPUs without `BHI_DIS_S`, the kernel executes a software BHB-clearing sequence (`clear_bhb_loop`) on every Ring-3 -> Ring-0 entry and VMExit:

```bash
#!/usr/bin/env bash
set -euo pipefail

# 1. Inspect your running kernel's Spectre v2 & Native BHI mitigation status:
cat /sys/devices/system/cpu/vulnerabilities/spectre_v2
# Expected hardened output on Intel Sapphire Rapids+:
# Mitigation: Enhanced / Automatic IBRS; IBPB: conditional; RSB filling;
#             PBRSB-eIBRS: SW sequence; BHI: BHI_DIS_S

# 2. Enforce strict BHI mitigation across both kernel syscalls and KVM VMExits
#    in /etc/default/grub (GRUB_CMDLINE_LINUX):
#    spectre_bhi=on spec_rstack_overflow=safe-ret
grep -E "spectre_bhi|mitigations" /proc/cmdline || true

# 3. Verify MSR_IA32_SPEC_CTRL (0x48):
#    Bit 0 = IBRS | Bit 1 = STIBP | Bit 2 = SSBD | Bit 10 (0x400) = BHI_DIS_S
SPEC_CTRL_HEX=$(rdmsr -0 0x48)
printf "MSR_IA32_SPEC_CTRL (0x48) = 0x%s (BHI_DIS_S = %d)\n" \
  "$SPEC_CTRL_HEX" "$(( (16#${SPEC_CTRL_HEX} >> 10) & 1 ))"
```

### 2. Disabling DMP via `DOIT` (`MSR_IA32_UARCH_MISC_CTL`) / `DIT` and Pointer Blinding

To prevent Data Memory-Dependent Prefetchers (`DMP`) from scanning cryptographic buffers:
- **Hardware Data Operand Independent Timing (`Intel DOIT` / `ARMv8.4-DIT`)**: Setting `MSR_IA32_UARCH_MISC_CTL[0] = 1` (`DOIT`, enabled in Linux for kernel crypto and exposed on ARM via `PSTATE.DIT`) or disabling the IP/Data prefetcher on sensitive cores prevents data-value-triggered prefetching on compliant microarchitectures.
- **Cryptographic Pointer Masking / Blinding & LLVM Speculative Load Hardening (`-mllvm -x86-speculative-load-hardening`)**:
  1. To stop **DMP (`GoFetch`)**, never store raw 64-bit intermediate values that can collide with canonical virtual address prefixes (`0x00007f...` on x86_64 or `0x00000001...` on ARM64); pack arithmetic limbs into 32-bit or 51-bit non-pointer-aligned representations or XOR-mask stored words with a per-invocation random blinding mask (`val ^ blind_mask`) before writing to RAM!
  2. To stop **Speculative Disclosure Gadgets (`BHI`)** inside high-value userspace daemons (`OpenSSH`, TLS terminators, KMS signers), compile critical translation units with **Clang Speculative Load Hardening (`__attribute__((speculative_load_hardening))`)**, which tracks conditional branch outcomes in a GPR predicate mask (`%r11 = -1` on misspeculation) and bitwise-ORs every loaded pointer or value with the speculation mask—turning any speculatively loaded secret into `0xFFFFFFFFFFFFFFFF` before it can index a cache line:

```c
// constant_time_slh_guard.c — Speculative Load Hardening + DMP Pointer Blinding
#include <stdint.h>
#include <stddef.h>

/*
 * Clang __attribute__((speculative_load_hardening)) instruments every basic block
 * with `cmov` state tracking so that under a BHI/Spectre misprediction,
 * all memory loads are bitwise masked to 0 before reaching a cache-timing gadget.
 */
__attribute__((speculative_load_hardening))
uint64_t slh_safe_key_lookup(const uint64_t *key_slot_array,
                             size_t slot_idx,
                             size_t array_bounds,
                             uint64_t dmp_blind_mask)
{
    if (slot_idx >= array_bounds) {
        return 0;
    }

    /*
     * Even if the CPU speculatively bypasses the bounds check above,
     * SLH forces `slot_idx` / the loaded value to be masked with all-1s or all-0s
     * at the architectural register level without needing a slow `lfence`!
     * And XORing with `dmp_blind_mask` prevents stored values from matching
     * canonical virtual address high-bits scanned by a hardware DMP.
     */
    uint64_t blinded_val = key_slot_array[slot_idx];
    return blinded_val ^ dmp_blind_mask;
}
```

| Microarchitectural Attack Vector | Bypassed Legacy Defense | Root Hardware Cause | Production Remediation (`Linux 6.8+` / `Clang 19+`) |
| :--- | :--- | :--- | :--- |
| **Spectre-BHB (`CVE-2022-0001`)** | Classic `eIBRS` | Shared global `BHB` across privilege rings | `SPEC_CTRL_BHI_DIS_S` or software `clear_bhb_loop` |
| **Native BHI / InSpectre (`CVE-2024-2201`)** | `spectre_bhi=auto` (early kernels) | Residual Ring-0 disclosure gadgets in supervisor BTB | `spectre_bhi=on` (`BHI_DIS_S` + `FineIBT` / `CET`) |
| **DMP / `GoFetch` / `Augury`** | Classic Constant-Time code | Cache prefetcher dereferences 64-bit data values matching pointers | `DOIT` / `PSTATE.DIT` + Non-Canonical Limb Packing & Blinding |
| **Userspace Cross-Thread `BHI`** | Kernel-only `BHI_DIS_S` | Same-process sandbox (`Wasm`/`eBPF`/JIT) BTB+BHB sharing | `__attribute__((speculative_load_hardening))` / `lfence` |
