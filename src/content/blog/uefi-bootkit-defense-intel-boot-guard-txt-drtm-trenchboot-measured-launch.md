---
title: "Below the OS: Defeating SPI Flash & UEFI DXE Bootkits with Intel Boot Guard, AMD Platform Secure Boot, and DRTM (TrenchBoot)"
description: "How Ring -2/-3 UEFI DXE and SPI flash bootkits (BlackLotus, LogoFAIL, PixieFail) hijack the kernel before ExitBootServices()—and how to combine fuse-blown SRTM (Intel Boot Guard / AMD PSB) with Dynamic Root of Trust for Measurement (DRTM via TXT SENTER, SKINIT, and TrenchBoot)."
pubDate: "2026-11-05"
updatedDate: "2026-11-05"
heroImage: "39.jpg"
tags: ["security", "linux", "kernel", "hardware", "zero-trust"]
author: "Joshua Edward McLaughlin Cox"
draft: true
---

Suppose you harden a bare-metal Linux server with `Unified Kernel Images (UKI)`, `UEFI Secure Boot` signed by custom `PK`/`KEK`/`db` keys, `dm-verity` immutable root filesystems, and `SELinux` / `BPF_LSM`. Can an attacker with transient root access—or a supply-chain compromise inside a vendor BMC or UEFI capsule update—still plant a persistent Ring `-2` implant that survives wiping every NVMe drive in the chassis?

**Yes.** And over the past three years, real-world campaigns (**`BlackLotus`**, **`LogoFAIL`**, **`PixieFail`**, **`CosmicStrand`**, and **`PKfail`**) have demonstrated how attackers weaponize the **massive, multi-megabyte attack surface of UEFI (`SEC -> PEI -> DXE -> BDS`)**.

Why is standard `UEFI Secure Boot`—which relies on a **Static Root of Trust for Measurement (`SRTM`, TPM PCRs `0..7`)**—insufficient against advanced firmware implants?
1. **The TCB Bloats Before `ExitBootServices()`**: A modern server UEFI image contains **300 to 600 independent `DXE` (`Driver Execution Environment`) PE/COFF binaries**—including full TCP/IPv6 network stacks (`PXE` / `HTTP Boot`), BMP/PNG/JPEG logo image parsers (`LogoFAIL`), USB/NVMe option ROMs, and ACPI table generators—all executing in **Ring 0 with identity-mapped physical memory and zero ASLR or NX page protection** until the final firmware versions!
2. **Hook Once, Own the Kernel**: If *any* of those 500 DXE drivers contains a heap buffer overflow (or if an attacker brings a vulnerable signed bootloader binary not yet in `dbx` and hooks `gBS->BootServices` / `arch_efi_call_virt` before `ExitBootServices()`), the implant can patch the Linux kernel's `verify_pefile_signature()` or `security_locked_down()` in RAM *after* Secure Boot verifies the UKI image, and even forge TPM `PCR 4`/`PCR 8` `TPM2_PCR_Extend` commands!

Here is how bare-metal security architects neutralize both **SPI Flash modification** and **UEFI DXE runtime compromises** by combining **Hardware Fuse-Blown `SRTM` (`Intel Boot Guard` / `AMD PSB`)** with **Hardware `DRTM` (`Dynamic Root of Trust for Measurement` via Intel `TXT` `GETSEC[SENTER]`, AMD `SKINIT`, and `TrenchBoot`)**.

---

## 1. Layer 1: Locking the SPI Flash Reset Vector (`Intel Boot Guard` & `AMD PSB` + `PR0` Write Protect)

Before the CPU executes a single instruction of `SEC` or `PEI` from the motherboard's 32 MB / 64 MB `SOIC-8` / `WSON-8` SPI NOR flash chip (`x86` reset vector `0xFFFFFFF0`), what stops an attacker with kernel root (`flashrom -p internal`) or BMC access from rewriting the Initial Boot Block (`IBB`) in SPI flash?

1. **Hardware Fuse-Blown Root (`Intel Boot Guard` in Verified Boot Mode & `AMD Platform Secure Boot`)**:
   - During manufacturing (or chassis provisioning), the SHA-384 hash of the OEM **Key Manifest (`KM`) Public Key** is permanently burned into One-Time Programmable **Field Programmable Fuses (`FPF`)** inside the Intel PCH/SoC or AMD Secure Processor (`ASP`/`PSP`).
   - On cold reset, before the x86 cores are released from reset, on-die microcode loads an Intel-signed **Authenticated Code Module (`ACM`)** into locked CPU Cache-as-RAM (`CAR` / `NEM` No-Evict Mode). The ACM verifies the signature of the `Key Manifest (KM)` -> `Boot Policy Manifest (BPM)` -> `Initial Boot Block (IBB)` inside CPU SRAM (preventing SPI TOCTOU attacks where a hardware FPGA interposer swaps flash bytes between verification and execution) and extends the result into **TPM 2.0 `PCR 0` with Locality 3/4**.
2. **SPI Controller Protected Range Registers (`PR0..PR4`) & `BLE` / `SMM_BWP`**:
   - Even if Boot Guard is active, you must verify that the chipset's `BIOS_CNTL` register locks out Ring-0 software writes to SPI flash unless executing inside authenticated System Management Mode (`SMM`):
   - **`BIOSWE = 0`** (BIOS Write Enable disabled), **`BLE = 1`** (BIOS Lock Enable: traps any attempt to set `BIOSWE=1` into an `SMI#`), and **`SMM_BWP = 1`** (SMM BIOS Write Protection: blocks flash writes unless all CPU cores are inside SMM).

You can audit your fleet's `Intel Boot Guard`, `BIOS_CNTL`, and `SPI PR0` lock bits directly from Linux using `fwupd` (`fwupdmgr security`) or reading the `MSR_BOOT_GUARD_SACM_INFO` (`0x13A`) register:

```bash
#!/usr/bin/env bash
set -euo pipefail

# 1. Inspect Intel Boot Guard (ACM status, Verified Boot, Measured Boot, FPF Fuse Lock)
#    MSR 0x13A (MSR_BOOT_GUARD_SACM_INFO):
#      Bit 0: NEMEnabled | Bit 1..2: TPMType | Bit 4: FPF SocConfigLock
#      Bit 5: MeasuredBoot | Bit 6: VerifiedBoot | Bit 32: BootGuardCapability
SACM_HEX=$(rdmsr -0 0x13a)
SACM_VAL=$((16#${SACM_HEX}))

printf "MSR_BOOT_GUARD_SACM_INFO (0x13A) = 0x%s\n" "$SACM_HEX"
echo "  [+] Boot Guard Capable : $(( (SACM_VAL >> 32) & 1 ))"
echo "  [+] Verified Boot (V)  : $(( (SACM_VAL >> 6)  & 1 ))"
echo "  [+] Measured Boot (M)  : $(( (SACM_VAL >> 5)  & 1 ))"
echo "  [+] FPF Fuse Locked    : $(( (SACM_VAL >> 4)  & 1 ))"

# 2. Run HSI (Host Security ID) Level 1..4 firmware audit via fwupd
fwupdmgr security --force
```

---

## 2. Layer 2: Eliminating the 500-Driver UEFI TCB with `DRTM` (`TrenchBoot`)

Wait: `Intel Boot Guard` and `AMD PSB` prove that the vendor's UEFI image on SPI flash hasn't been modified. **They do NOT protect you when a signed, vendor-authentic UEFI DXE driver gets exploited at boot time** via a malicious DHCPv6 packet (`PixieFail`), a malformed boot splash image (`LogoFAIL`), or a poisoned NVRAM variable!

In a **Static Root of Trust (`SRTM`, PCR `0..7`)**, trust is a fragile chain from power-on: if link #3 (`DXE`) is compromised, link #4 (`Bootloader`) and link #5 (`Linux Kernel`) cannot be trusted—because the compromised `DXE` driver can hook the kernel before it starts and spoof every subsequent `TPM2_PCR_Extend` sent over the TPM bus from Locality 0!

**Dynamic Root of Trust for Measurement (`DRTM`)** completely cuts the UEFI chain out of the Trusted Computing Base (`TCB`):

```text
+-----------------------------------------------------------------------------------+
|       STATIC ROOT OF TRUST (SRTM) VS. DYNAMIC ROOT OF TRUST (DRTM / TRENCHBOOT)   |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [ SRTM: Fragile Cumulative Chain (TPM Locality 0 -> PCR 0..7) ]                  |
|    Reset -> SEC -> PEI -> [ 500 DXE Drivers (PXE/Logo/USB) ] -> Shim/GRUB -> Linux|
|                                   |                                               |
|                                   +--> Compromised DXE Driver hooks Kernel RAM    |
|                                        & spoofs Locality-0 PCR 4/8 measurements!  |
|                                                                                   |
|  -------------------------------------------------------------------------------  |
|                                                                                   |
|  [ DRTM (TrenchBoot): Hardware Late-Launch Reset (TPM Locality 2 -> PCR 17..22) ] |
|    1. Untrusted UEFI/Bootloader loads Linux UKI + SINIT ACM into RAM              |
|    2. Bootloader executes CPU instruction: `GETSEC[SENTER]` (Intel) or `SKINIT`   |
|    3. CPU Hardware Microcode:                                                     |
|       ├── Halts all other SMP Application Processors (APs -> Wait-for-SIPI)       |
|       ├── Enables IOMMU DMA Protection (`VT-d PMR` / `AMD DEV`) on MLE RAM        |
|       ├── Opens Hardware-Only **TPM Locality 2** (`0xFED42000`) -> Resets PCR 17..22|
|       ├── Hashes the Linux Kernel (`MLE`) in silicon & extends into **PCR 17/18** |
|       └── Jumps directly into Linux `sl_stub_entry` with Interrupts/SMI Masked!   |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

### How `GETSEC[SENTER]` (Intel `TXT`) and `SKINIT` (AMD `SVM`) Work in Silicon

Why can't a compromised UEFI DXE bootkit spoof `TPM PCR 17` or `PCR 18`?
Because the TPM 2.0 specification enforces **Hardware Bus Locality (`Locality 0..4`)** enforced by physical address decoding inside the CPU/PCH chipset (`0xFED40000` + `0x1000 * Locality`):
- **`PCR 17..22` can ONLY be reset (`TPM_Reset`) by hardware `Locality 4`** (triggered exclusively by the CPU executing the `GETSEC[SENTER]` or `SKINIT` instruction) and extended by **`Locality 2`** (the Measured Launch Environment `MLE`). Normal Ring-0 software (even a rootkit or UEFI DXE driver running at `CPL 0`) can only access `Locality 0`!
- When `TrenchBoot` executes `GETSEC[SENTER]` (or AMD `SKINIT` into the Secure Loader):
  1. The CPU broadcasts a special bus cycle that **freezes all other CPU cores**, masks `NMI#`, `INIT#`, and `SMI#` interrupts, and programs the **IOMMU Protected Memory Region (`VT-d PMR` / `AMD DEV`)** so no PCIe/NVMe/NIC device can DMA-overwrite the kernel image in RAM.
  2. The CPU resets `PCR 17..22` via `Locality 4`, hashes the **Secure Launch (`MLE` / Linux kernel `vmlinuz`)** and its command line/initramfs directly into **`PCR 17` and `PCR 18`**, and jumps straight into the Linux kernel's `sl_stub_entry` (`arch/x86/kernel/slmodule.c`).
  3. Any hooks, rootkits, or trampolines planted by UEFI DXE drivers are **completely bypassed and wiped out** when the kernel initializes fresh page tables from its measured MLE entry point!

---

## 3. Sealing Disk & Attestation Keys to DRTM `PCR 17 + 18` (`tpm2-tools`)

By sealing your node's LUKS/NVMe encryption key and SPIRE/Keylime hardware attestation quote to **DRTM `PCR 17` and `PCR 18`**, two magical things happen simultaneously:
1. **Malicious UEFI DXE implants are mathematically locked out**: If an attacker modifies the kernel in memory before `SENTER`/`SKINIT`, the silicon-measured hash extended into `PCR 17/18` changes, and the TPM refuses to unseal the secret. If the attacker skips `SENTER`/`SKINIT`, `PCR 17/18` remain at their default `0xFF..FF` unreset state, and unsealing also fails!
2. **Firmware Updates No Longer Break Disk Unsealing**: Because `PCR 17/18` only measure the `SINIT ACM` / `Secure Loader` and the `Linux Kernel + Initramfs` (ignoring the 500 UEFI DXE drivers in `PCR 0..7`), you can upgrade motherboard UEFI versions across your fleet without re-enrolling TPM policies!

```bash
#!/usr/bin/env bash
set -euo pipefail

# 1. Verify TrenchBoot DRTM Secure Launch succeeded and populated PCR 17 & PCR 18
#    (Unlaunched systems show all 0xFF or all 0x00 in PCR 17/18)
tpm2_pcrread sha256:17,18

# 2. Inspect the DRTM Event Log recorded during GETSEC[SENTER] / SKINIT
ls -la /sys/kernel/security/slaunch/eventlog

# 3. Create a TPM 2.0 Policy bound strictly to DRTM PCR 17 (ACM/SL) + PCR 18 (Kernel MLE)
tpm2_startauthsession -S session.ctx
tpm2_policypcr -S session.ctx -l sha256:17,18 -L drtm_pcr17_18.policy
tpm2_flushcontext session.ctx

# 4. Seal the bare-metal node's root attestation / disk secret to PCR 17+18
tpm2_createprimary -C o -g sha256 -G ecc -c primary.ctx
tpm2_create -C primary.ctx \
  -u sealed_key.pub -r sealed_key.priv \
  -L drtm_pcr17_18.policy \
  -i /etc/keys/node_master_secret.bin
```

| Boot Security Architecture | Trusted Computing Base (TCB) Size | Survives `LogoFAIL` / `PixieFail` DXE Exploit? | Survives Malicious Bootloader (`BlackLotus`)? | Breaks TPM Policy on BIOS Update? |
| :--- | :---: | :---: | :---: | :---: |
| **Legacy UEFI Secure BootOnly** | ~550 DXE Drivers + Shim + GRUB + Kernel | **No** (Ring-0 hook before `ExitBootServices`) | **No** (BYOVD bootloader bypass) | N/A |
| **SRTM (`Boot Guard` + `PCR 0..7`)** | ~550 DXE Drivers + Shim + GRUB + Kernel | **No** (DXE runs *after* `PCR 0` measurement!) | Detected (If `PCR 4` is sealed) | **Yes** (`PCR 0/2` changes on every BIOS update) |
| **SRTM + DRTM (`TrenchBoot` `PCR 17..18`)** | **CPU Silicon + `SINIT/SL` + Linux Kernel Only!** | **Yes (100% Bypassed via Late Launch!)** | **Yes (Hardware `Locality 4` PCR 17/18)** | **No (`PCR 17/18` decoupled from UEFI DXE!)** |
