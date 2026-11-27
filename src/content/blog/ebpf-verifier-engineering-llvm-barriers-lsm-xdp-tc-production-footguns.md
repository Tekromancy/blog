---
title: "Fighting the Linux eBPF Verifier & Surviving Production Ring-0 Footguns: -mcpu=v3, barrier_var(), BPF-LSM Clamping, XDP Fragment Traps, and Multi-Arch CO-RE"
description: "Why valid C breaks inside kernel/bpf/verifier.c under LLVM optimization—and how to defeat scalar range loss, silent bpf_skb_load_bytes bitmask truncation, IPv4/IPv6 fragment L4 spoofing, TC softIRQ cgroup misattribution, amd64/arm64 bpf2go ABI drift, and userspace FD teardown races."
pubDate: "2026-11-27"
updatedDate: "2026-11-27"
heroImage: "47.jpg"
tags: ["linux", "ebpf", "kernel", "security", "networking"]
author: "Joshua Edward McLaughlin Cox"
draft: false
---

Compiling an eBPF C program cleanly with `clang -target bpf -O2` only tells you that LLVM accepted your syntax. It tells you nothing about whether **`kernel/bpf/verifier.c`** will load your bytecode on a production kernel—and even worse, passing the verifier tells you nothing about whether your Ring-0 program is silently corrupting telemetry, misattributing container identities, or racing userspace file descriptors.

In real-world Linux security daemons and high-throughput packet pipelines, Ring-0 eBPF failures split into two asymmetric classes:

1. **Load-Time Verifier Rejections**: Sound C invariants—like clamping an error code to `[-4095, 0]` or reading up to `40` bytes of TCP header options—get shredded by LLVM register allocation, subregister zero-extension, or branch merging (`w1` vs `r1`, `r2` register identity splitting) until the verifier's abstract interpreter loses track of scalar bounds and rejects `BPF_PROG_LOAD` with `-EACCES`.
2. **Verifier-Accepted Production Footguns**: Code that passes every safety check inside `verifier.c` while harbouring subtle semantic bugs—bitmasks that silently drop `32–39`-byte TCP options, IPv4 fragment masks applied to RFC 8200 IPv6 fragment headers, `current`-task helpers executed inside softIRQ packet hooks, `x86_64` `pt_regs` headers shipped to `arm64`, and Go userspace map updates racing `Close()`.

This field manual dissects all six failure modes down to the actual eBPF instruction stream, kernel verifier state, wire bit layouts, and userspace Go synchronization primitives required to run multi-architecture eBPF safely in production.

---

## 1. Inside `kernel/bpf/verifier.c`: LLVM Register Splitting, `-mcpu=v3`, and BPF-LSM Return Clamping

When the verifier executes symbolic abstract interpretation over every reachable path in your program, every 64-bit general-purpose register (`R0`–`R10`) tracks both:

- **Known/unknown bit values** via a tracked number (`struct tnum { u64 value; u64 mask; }`), where a `1` bit in `mask` marks an unknown bit and `value` holds known bits;
- **Signed and unsigned intervals** across both 64-bit and 32-bit subregisters (`smin_value`/`smax_value`, `umin_value`/`umax_value`, `s32_min_value`/`s32_max_value`, `u32_min_value`/`u32_max_value`);
- **Register identity (`reg->id`)**, which `find_equal_scalars()` uses to propagate range refinements learned from conditional jumps across aliased copies of the same register.

For non-void **`BPF_PROG_TYPE_LSM`** hooks (`lsm/socket_bind`, `lsm/bpf`, `lsm/uring_sqpoll`, `lsm/bpf_token_create`), `check_return_code()` and `retval_range_within()` enforce a strict exit invariant on `R0`: every exit path must prove **`R0 ∈ [-MAX_ERRNO, 0]`**, i.e., `[-4095, 0]` (either `0` to permit or a negative kernel `errno`).

```text
+-----------------------------------------------------------------------------------+
|         BPF-LSM VERIFIER EXIT CONTRACT & LLVM REGISTER SPLITTING HAZARD           |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  BPF_PROG(..., int ret)  // Prior LSM hook return enters ctx[N] as 64-bit scalar  |
|       │                                                                           |
|       ├──[ BROKEN: `int BPF_PROG(...)` + `if (ret) return ret;` ]                 |
|       │      LLVM emits 32-bit `w0 = -1` / `w0 = w1`                              |
|       │      32-bit subreg write ZERO-EXTENDS upper 32 bits of R0!                |
|       │      `-1` becomes `0x00000000_ffffffff` (+4294967295)                     |
|       │      └──► check_return_code(): smax=4294967295 ∉ [-4095, 0] ──► REJECT    |
|       │                                                                           |
|       ├──[ BROKEN: Unbarriered `if (r > -1 || r < -4095) return -1;` ]            |
|       │      LLVM narrows comparison to `w1`, copies/sign-extends into `r2`       |
|       │      `if w1 s< -4095` refines `w1`, NOT `r2` (`reg->id` diverged!)         |
|       │      `r0 = r2` exits with `smin=-2147483648, smax=-1` ─────────► REJECT   |
|       │                                                                           |
|       └──[ VERIFIED: `long BPF_PROG(...)` + `-mcpu=v3` + `barrier_var(r)` ]       |
|              `r1 = w1; r1 <<= 32; r1 s>>= 32` (explicit sign-extend into `r1`)    |
|              `asm volatile("" : "+r"(r))` pins bounds check directly on 64-bit r1 |
|              `if r1 s> -1`  ──► `r1->smax_value = -1`                             |
|              `if r1 s< -4095` (BPF_JSLT in v3!) ──► `r1->smin_value = -4095`      |
|              `r0 = r1` exits with `R0 ∈ [-4095, -1]` ─────────────────► PASS      |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

![LLVM Register Splitting vs. Verifier-Safe Scalar Bounds in kernel/bpf/verifier.c](/images/ebpf-verifier-llvm-register-splitting.jpg)
*Figure 1: How 32-bit subregister zero-extension and LLVM register splitting break `check_return_code()` in `BPF_PROG_TYPE_LSM` programs, why `-mcpu=v3` + `barrier_var()` preserve 64-bit scalar intervals, and how chunked `bpf_skb_load_bytes()` avoids silent `32..39`-byte TCP option truncation.*

### Why Three Real Clang Disassemblies Decide Load vs. Rejection

Consider the classic `BPF_PROG` LSM chaining pattern where a stacked LSM hook forwards a previous module's non-zero denial `ret`:

```c
/* BROKEN PATTERN #1: 32-bit `int` return type on LSM trampoline */
SEC("lsm/socket_bind")
int BPF_PROG(guard_socket_bind, struct socket *sock,
             struct sockaddr *address, int addrlen, int ret)
{
    if (ret != 0)
        return ret; /* Unbounded scalar from ctx AND 32-bit subreg zero-ext! */
    return -EPERM;
}
```

Compiling with `clang -x c -target bpf -O2 -mcpu=v3 -S` exposes why `int` returns poison `R0`:

```asm
lsm_int_ret:
    w0 = -1                 ; 32-bit write zero-extends R0 to 0x00000000ffffffff (+4294967295)!
    if w1 == 0 goto .LBB0_2
    w0 = w1                 ; Passes completely unconstrained positive/negative scalar!
.LBB0_2:
    exit
```

Switching the return type to **`long`** eliminates the 32-bit zero-extension (`r0 = -1` sign-extends to `0xffffffffffffffff`), so you might write a naive single-statement clamp:

```c
/* BROKEN PATTERN #2: Combined clamp without compiler optimization barriers */
static __always_inline long clamp_combined(int ret)
{
    long r = (long)ret;
    if (r > -1 || r < -4095)
        return -EPERM;
    return r;
}
```

Inspect the actual `-target bpf -O2 -mcpu=v3` assembly Clang generates for `clamp_combined`:

```asm
clamp_combined:
    r0 = -1
    r2 = -1
    if w1 s> -1 goto .LBB0_2
    r2 = w1
    r2 <<= 32               ; Sign-extends w1 into r2...
    r2 s>>= 32              ; ...breaking register identity linkage with r1/w1!
.LBB0_2:
    if w1 s< -4095 goto .LBB0_4  ; Bounds check runs on 32-bit w1, NOT r2!
    r0 = r2                      ; Exits with r2! Verifier sees smin = -2147483648!
.LBB0_4:
    exit
```

Because LLVM copied and sign-extended `w1` into **`r2`**, while performing the `< -4095` branch on **`w1`**, the verifier's `find_equal_scalars()` cannot link `w1`'s narrowed `s32_min_value = -4095` back to `r2`. `check_return_code()` immediately aborts loading with:

```text
At program exit the register R0 has smin=-2147483648 smax=-1 should have been in [-4095, 0]
```

And notice what happens if you compile with the legacy `-mcpu=v1` target instead of **`-mcpu=v3`**: eBPF ISA `v1` lacks signed less-than jumps (`BPF_JSLT` / `if r1 s< -4095`), forcing LLVM to materialize `-4095` into a scratch register (`r2 = -4095; if r2 s> r1 goto ...`), consuming extra registers and spilling across complex LSM functions—whereas `-mcpu=v3` unlocks native `BPF_JSLT` and full 32-bit ALU subregister instructions (`ALU32`).

Now wrap the clamp checks with **`barrier_var(r)`** (`asm volatile("" : "+r"(r));`), telling LLVM that `r` is both read and clobbered in-place so the optimizer cannot split the checked variable into `r2` or collapse the two branches into an unprovable CFG diamond:

```c
/* VERIFIED PATTERN: 64-bit long return + -mcpu=v3 + barrier_var() */
#ifndef barrier_var
#define barrier_var(var) asm volatile("" : "+r"(var))
#endif

static __always_inline long clamp_lsm_ret(int ret)
{
    long r = (long)ret;
    barrier_var(r);
    if (r > -1)
        return -EPERM;
    barrier_var(r);
    if (r < -4095)
        return -EPERM;
    return r;
}
```

Look at the exact `-target bpf -O2 -mcpu=v3` instruction stream produced:

```asm
clamp_lsm_ret:
    r1 = w1
    r1 <<= 32
    r1 s>>= 32              ; Sign-extend once into r1
    #APP / #NO_APP          ; barrier_var(r): anchors bounds tracking on r1
    r0 = -1
    if r1 s> -1 goto .LBB0_3     ; r1->smax_value becomes -1
    #APP / #NO_APP          ; barrier_var(r): prevents branch folding
    if r1 s< -4095 goto .LBB0_3  ; v3 BPF_JSLT: r1->smin_value becomes -4095!
    r0 = r1                      ; R0 strictly in [-4095, -1]
.LBB0_3:
    exit
```

Every branch narrows the **exact same 64-bit register `r1`**, and `-mcpu=v3` emits `if r1 s< -4095` directly.

### Variable-Size Kernel Struct Reads in `lsm/socket_bind`

The same `barrier_var()` discipline prevents subtle verifier and out-of-bounds read traps when parsing variable-length kernel `sockaddr` buffers inside `lsm/socket_bind`. Consider hardening `AF_ALG` binds (e.g., blocking unapproved userspace access to `aead` kernel crypto transforms):

Naively doing `if (addrlen < sizeof(struct sockaddr_alg)) return 0;` breaks if a caller supplies a valid shorter `sockaddr_alg` name (say `30` bytes total: `24`-byte header + `"cbc(aes)\0"`), **or** conversely triggers a verifier variable-offset rejection if you try to compute `addrlen - 24` dynamically without pinning bounds on the read length register.

The clean Ring-0 pattern splits fixed-header validation from barriered tail inspection:

```c
#define AF_ALG          38
#define SALG_TYPE_LEN   14
#define SALG_NAME_LEN   64

struct alg_addr_wire {
    __u16 family;
    __u8  type[SALG_TYPE_LEN];
    __u32 feat;
    __u32 mask;
    __u8  name[SALG_NAME_LEN];
}; /* Fixed header = 2 + 14 + 4 + 4 = 24 bytes */

SEC("lsm/socket_bind")
long BPF_PROG(guard_af_alg_bind, struct socket *sock,
              struct sockaddr *address, int addrlen, int ret)
{
    struct alg_addr_wire alg = {};
    static const char aead_type[SALG_TYPE_LEN] = "aead";

    if (ret != 0)
        return clamp_lsm_ret(ret);

    /* Never touch address->sa_family directly on untrusted ptr; verify min header + 1 byte */
    if (!address || addrlen < 25)
        return 0;

    if (bpf_probe_read_kernel(&alg, 24, address) < 0)
        return 0;

    if (alg.family != AF_ALG)
        return 0;

    if (bpf_strncmp(alg.type, sizeof(alg.type), aead_type) != 0)
        return 0;

    /* Safely read variable-length salg_name up to SALG_NAME_LEN - 1 */
    __u32 name_len = (__u32)(addrlen - 24);
    if (name_len > SALG_NAME_LEN - 1)
        name_len = SALG_NAME_LEN - 1;
    barrier_var(name_len);
    if (name_len > 0 && name_len < SALG_NAME_LEN)
        bpf_probe_read_kernel(alg.name, name_len, (const char *)address + 24);
    alg.name[SALG_NAME_LEN - 1] = '\0';

    /* Enforce policy & emit ringbuf telemetry */
    return should_allow_aead() ? 0 : -EPERM;
}
```

Notice two defensive wins here:
- Checking `addrlen < 25` avoids probing past short `struct sockaddr_in` (`16` bytes) *and* accepts legitimate `AF_ALG` binds shorter than `sizeof(struct sockaddr_alg)` (`88` bytes).
- Using `barrier_var(name_len)` before `if (name_len > 0 && name_len < SALG_NAME_LEN)` guarantees LLVM emits the branch check against the exact register passed as `R2` (`size`) to `bpf_probe_read_kernel()`, keeping `umin_value >= 1` and `umax_value <= 63` intact.

---

## 2. Variable-Length `bpf_skb_load_bytes()` & The Silent Bitmask Truncation Bug

Reading TCP header options (`opt_len = (tcp->doff * 4) - 20`, yielding `0..40` bytes) inside a TC `sched_cls` inspector is one of the most common places where engineers accidentally sacrifice correctness to appease the verifier.

The helper signature `bpf_skb_load_bytes(skb, offset, to, len)` uses **`ARG_CONST_SIZE`** semantics in `verifier.c`:
1. `len` must prove **`umin_value >= 1`** (on most kernels, passing `0` is explicitly rejected because `ARG_CONST_SIZE_OR_ZERO` is *not* used here);
2. `len` must prove **`umax_value <= sizeof(optbuf)`** (`40` bytes) along *every* control-flow edge reaching the call.

Look what happens when an engineer writes the naive clamped code and LLVM optimizes it (`-O2 -mcpu=v3`):

```c
void read_len_nobarrier(const void *skb, unsigned int off, unsigned int len)
{
    char buf[40];
    if (len > 40) len = 40;
    if (len == 0) return;
    bpf_skb_load_bytes(skb, off, buf, len);
}
```

In a tiny isolated function, Clang emits clean `w4 = 40`. Inside a larger `process_tc_packet()` function with register pressure, however, LLVM routinely sinks `len` across spill slots or emits `cmov`/phi merges where the verifier loses the upper bound `umax=40` on `R4`, throwing:

```text
R4 min value is negative, either use unsigned or 'var &= const'
R4 max value is outside of the allowed memory range
```

To silence that error, developers frequently reach for a power-of-two bitmask—and introduce one of the sneakiest silent data-corruption bugs in eBPF networking:

```c
/* BUGGY WORKAROUND: Silently truncates 32..39-byte TCP options! */
if (load_len >= 40) {
    bpf_skb_load_bytes(skb, opt_off, optbuf, 40);
} else {
    __u32 bounded = load_len & 0x1F; /* 0..31 */
    if (bounded == 0) return;
    bpf_skb_load_bytes(skb, opt_off, optbuf, bounded);
}
```

Do the binary math on real-world Linux, macOS, and Windows `SYN` packets, whose TCP option headers routinely measure **32 bytes** or **36 bytes** (`MSS` + `SACK-Permitted` + `Timestamps` + `NOP` + `Window Scale`):

| Actual `opt_len` | Binary (`load_len`) | `load_len & 0x1F` Result | Silent Data Loss | Impact on L4 Telemetry & OS Fingerprinting |
| :--- | :--- | :--- | :--- | :--- |
| **`20` bytes** | `0b010100` | `20` bytes | `0` bytes (`0%`) | Intact (`doff=10`) |
| **`32` bytes** | `0b100000` | **`0` bytes** | **`32` bytes (`100%`)** | Hits `if (bounded == 0) return;` — **all TCP options vanish!** |
| **`36` bytes** | `0b100100` | **`4` bytes** | **`32` bytes (`89%`)** | Reads only `MSS` (4B), drops `SACK`/`Timestamps`/`WScale` |
| **`39` bytes** | `0b100111` | **`7` bytes** | **`32` bytes (`82%`)** | Corrupts fingerprint signature & misclassifies client OS |
| **`40` bytes** | `0b101000` | `40` bytes (via `>=40`) | `0` bytes (`0%`) | Only works because the `>= 40` branch caught it |

### The Fix: Power-of-Two Prefix Decomposition + Double-Mask Barriers

Because `32..39` cannot be represented by a single power-of-two bitmask without covering `40..63` (which overflows a `40`-byte stack buffer), split `[32, 39]` into an exact **`32`-byte constant load** followed by a **`0..7`-byte (`& 0x07`) tail load** at `opt_off + 32`:

```c
static __always_inline void parse_tcp_options(struct __sk_buff *skb,
                                              __u32 opt_off,
                                              __u32 opt_len)
{
    __u8 optbuf[40] = {};
    __u32 load_len = opt_len;
    if (load_len > sizeof(optbuf))
        load_len = sizeof(optbuf);

    /* Always load 1..40 bytes via verifier-friendly constant-bounded helper calls */
    if (load_len >= 40) {
        if (bpf_skb_load_bytes(skb, opt_off, optbuf, 40) != 0)
            return;
    } else if (load_len >= 32) {
        if (bpf_skb_load_bytes(skb, opt_off, optbuf, 32) != 0)
            return;
        __u32 rem = load_len & 0x07;
        barrier_var(rem);
        rem &= 0x07; /* Re-locks tnum.mask = 0x7 in R4 right before branch */
        if (rem > 0) {
            if (bpf_skb_load_bytes(skb, opt_off + 32, optbuf + 32, rem) != 0)
                return;
        }
    } else {
        __u32 bounded = load_len & 0x1F;
        barrier_var(bounded);
        bounded &= 0x1F; /* Re-locks tnum.mask = 0x1F in R4 right before branch */
        if (bounded == 0)
            return;
        if (bpf_skb_load_bytes(skb, opt_off, optbuf, bounded) != 0)
            return;
    }

    /* Walk optbuf[0..load_len) safely with #pragma unroll */
}
```

Why do we mask **`& 0x07`** (and `& 0x1F`) **both before and after `barrier_var()`**?
Because without the barrier, LLVM knows `load_len < 32` implies `load_len & 0x1F == load_len` and **deletes your bitmask as redundant dead code!** Once LLVM deletes `&= 0x1F`, the verifier sees only an opaque register if spill/reload occurred. Placing `barrier_var(bounded)` followed by `bounded &= 0x1F;` forces Clang to emit an explicit `w4 &= 31` (or `w6 &= 7`) instruction immediately preceding the `if == 0` guard and `call bpf_skb_load_bytes`, guaranteeing `tnum` upper bits are provably zero:

```asm
    ; Else-if (load_len >= 32) tail path (-mcpu=v3):
    w6 &= 7
    #APP / #NO_APP          ; barrier_var(rem)
    w6 &= 7                 ; Verifier sees explicit R6.tnum.mask = 0x7 (umax = 7)
    if w6 == 0 goto .LBB1_8 ; R6.umin becomes 1!
    w8 += 32
    r3 = r10
    r3 += -8                ; optbuf + 32: stack offset -8, valid size >= 7!
    ...
    call bpf_skb_load_bytes
```

Zero silent truncation across the entire `[0, 40]` option range, and 100% verifier proof stability across kernel versions.

---

## 3. XDP Pre-Reassembly Fragment Confusion: IPv4 `0x1FFF` vs. IPv6 RFC 8200 `0xFFF8`

An XDP program (`xdp_drv` or `xdp_generic`) executes inside the NIC driver's NAPI poll loop **long before the Linux network stack runs IP defragmentation** (`ip_defrag()` for IPv4 or `nf_ct_frag6_gather()` / `ipv6_frag_rcv()` for IPv6).

Whenever a fragmented IPv4 or IPv6 datagram arrives:
- **Fragment 0 (initial fragment, offset = 0)** contains the Layer-4 header (TCP/UDP ports, TCP flags) immediately after L3/extension headers.
- **Fragments 1..N (non-initial fragments, offset > 0)** carry **raw L4 payload bytes** at the exact byte offset where an L4 parser expects `struct tcphdr` or `struct udphdr`!

If your XDP flow parser fails to gate `parse_l4_ports_and_flags()` on `offset == 0`, arbitrary application data (for example, ASCII or binary bytes inside a large TLS certificate or DNSSEC response at offset `+1480`) gets interpreted as synthetic `src_port`, `dst_port`, `SYN`, and `RST` TCP flags—polluting flow tables and triggering false SYN-flood or port-scan alerts!

Even engineers who remember to guard IPv4 fragments routinely introduce a devastating bug when implementing IPv6 **Fragment Extension Header (`Next Header == 44`, `NEXTHDR_FRAGMENT`)**, because **the 16-bit `frag_off` field flips bit layout between IPv4 and IPv6**:

```text
+-----------------------------------------------------------------------------------+
|               IPv4 iphdr->frag_off  vs.  IPv6 frag_hdr->frag_off                  |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  IPv4 (RFC 791) 16-bit field (Network Byte Order):                                |
|   0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15                   |
|  +---+---+---+---------------------------------------------------+                |
|  | R |DF |MF |           Fragment Offset (13 bits)               |                |
|  +---+---+---+---------------------------------------------------+                |
|  Mask for Fragment Offset != 0:   bpf_htons(0x1FFF)                               |
|                                                                                   |
|  IPv6 Fragment Extension Header (RFC 8200, Next Header = 44):                     |
|   0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15                   |
|  +---------------------------------------------------+-------+---+                |
|  |           Fragment Offset (13 bits)               |  Res  | M |                |
|  +---------------------------------------------------+-------+---+                |
|  Mask for Fragment Offset != 0:   bpf_htons(0xFFF8)                               |
|                                                                                   |
|  IF YOU MISTAKENLY COPY `0x1FFF` TO IPv6:                                         |
|   1. Initial fragment (Offset=0, M=1 -> 0x0001): `0x0001 & 0x1FFF != 0`           |
|      ──► FALSE POSITIVE: Initial fragment skipped! Valid L4 traffic ignored!      |
|   2. Offset = 8192+ bytes (0x2000..0xE000): `0xE000 & 0x1FFF == 0`                |
|      ──► FALSE NEGATIVE: Trailing fragment parsed as fake TCP/UDP L4 header!      |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

### Verifier-Safe Dual-Stack XDP Fragment Gating

Notice the key design invariant: **still count L3 packets and bytes for non-initial fragments** (so volumetric telemetry stays accurate), while **suppressing L4 port/flag extraction** whenever the fragment offset is non-zero:

```c
#define NEXTHDR_HOP      0
#define NEXTHDR_ROUTING  43
#define NEXTHDR_FRAGMENT 44
#define NEXTHDR_AUTH     51
#define NEXTHDR_DEST     60

struct ipv6_ext_hdr_wire {
    __u8 nexthdr;
    __u8 hdrlen;
};

struct ipv6_frag_hdr_wire {
    __u8   nexthdr;
    __u8   reserved;
    __be16 frag_off;
    __be32 identification;
};

static __always_inline int handle_ipv4_xdp(void *data_end, struct iphdr *ip,
                                           struct flow_key4 *key, __u8 *is_syn,
                                           __u8 *is_rst)
{
    if ((void *)(ip + 1) > data_end || ip->ihl < 5)
        return -1;

    __u32 ihl_bytes = (__u32)ip->ihl * 4;
    void *l4 = (void *)ip + ihl_bytes;
    if (l4 > data_end)
        return -1;

    /* Only offset == 0 carries L4 headers; MF bit (0x2000) and DF (0x4000) ignored */
    if ((ip->frag_off & bpf_htons(0x1FFF)) == 0)
        parse_l4_ports_and_flags(l4, data_end, ip->protocol,
                                 &key->src_port, &key->dst_port, is_syn, is_rst);
    return 0;
}

static __always_inline int handle_ipv6_xdp(void *data_end, struct ipv6hdr *ip6,
                                           struct flow_key6 *key6, __u8 *is_syn,
                                           __u8 *is_rst)
{
    if ((void *)(ip6 + 1) > data_end)
        return -1;

    __u8 nexthdr = ip6->nexthdr;
    void *l4 = (void *)(ip6 + 1);
    __u8 is_noninitial_frag6 = 0;

    /* Bounded extension-header walk for eBPF verifier convergence */
    #pragma unroll
    for (int i = 0; i < 4; i++) {
        if (nexthdr == NEXTHDR_HOP || nexthdr == NEXTHDR_ROUTING || nexthdr == NEXTHDR_DEST) {
            struct ipv6_ext_hdr_wire *ext = l4;
            if ((void *)(ext + 1) > data_end)
                break;
            nexthdr = ext->nexthdr;
            l4 = (void *)ext + ((__u32)ext->hdrlen + 1) * 8;
        } else if (nexthdr == NEXTHDR_FRAGMENT) {
            struct ipv6_frag_hdr_wire *frag = l4;
            if ((void *)(frag + 1) > data_end)
                break;
            /* RFC 8200: upper 13 bits are Fragment Offset (0xFFF8 in host order) */
            if ((frag->frag_off & bpf_htons(0xFFF8)) != 0)
                is_noninitial_frag6 = 1;
            nexthdr = frag->nexthdr;
            l4 = (void *)(frag + 1);
        } else if (nexthdr == NEXTHDR_AUTH) {
            struct ipv6_ext_hdr_wire *ah = l4;
            if ((void *)(ah + 1) > data_end)
                break;
            nexthdr = ah->nexthdr;
            l4 = (void *)ah + ((__u32)ah->hdrlen + 2) * 4;
        } else {
            break;
        }
    }

    if (l4 > data_end)
        return -1;

    if (!is_noninitial_frag6)
        parse_l4_ports_and_flags(l4, data_end, nexthdr,
                                 &key6->src_port, &key6->dst_port, is_syn, is_rst);
    return 0;
}
```

Check one extra RFC detail in that loop: **`NEXTHDR_AUTH` (AH, protocol 51)** measures `hdrlen` in 32-bit words minus 2 (`(ah->hdrlen + 2) * 4`), unlike Hop-by-Hop/Routing/Destination Options which measure in 8-octet units minus 1 (`(ext->hdrlen + 1) * 8`). Getting that offset wrong by 4 bytes scrambles every subsequent extension header or L4 port lookup!

---

## 4. The TC SoftIRQ `current` Illusion (`bpf_get_current_cgroup_id` vs. `bpf_skb_cgroup_id`)

Suppose you attach a `BPF_PROG_TYPE_SCHED_CLS` (`tc`) program on a container host or router interface to attribute packet flows and suspicious anomalies back to a specific systemd slice or Kubernetes pod cgroup v2 ID.

If you write:

```c
/* BUG: Reads whatever random process got interrupted by NET_RX/TX_SOFTIRQ! */
ev->cgroup_id = bpf_get_current_cgroup_id();
```

`verifier.c` will happily accept `bpf_get_current_cgroup_id()` in a `SCHED_CLS` program! Yet in production your telemetry stream immediately fills with garbage attribution: packets sent by `nginx.service` get tagged with `prometheus-node-exporter` or the root slice (`ksoftirqd/3` / `swapper/0`).

**Why?** Because `tc` ingress and egress hooks execute in **`NET_RX_SOFTIRQ` and `NET_TX_SOFTIRQ`** bottom-half interrupt context—not synchronously inside a syscall! `bpf_get_current_cgroup_id()` dereferences `current->cgroups->dfl_cgrp` on the current CPU's `task_struct`, which belongs to whichever unrelated user thread happened to be preempted by the NIC interrupt, or `ksoftirqd` under heavy packet load.

The dedicated socket-buffer helper is **`bpf_skb_cgroup_id(skb)`** (`BPF_FUNC_skb_cgroup_id`, available since Linux 4.18 when `CONFIG_SOCK_CGROUP_DATA=y`), which walks **`skb->sk->sk_cgrp_data`** directly from the packet's owning socket instead of `current`.

![Production Ring-0 Data-Path Hardening Across XDP Fragments, TC SoftIRQ Cgroups, and Multi-Arch Lifecycle](/images/ebpf-xdp-tc-multiarch-pipeline.jpg)
*Figure 2: End-to-end Ring-0 hardening across XDP pre-reassembly fragment filtering, TC softIRQ cgroup resolution (`bpf_skb_cgroup_id(skb)` vs. ingress `skb->sk == NULL`), multi-architecture `bpf2go` targets, and synchronized Go eBPF object teardown.*

### The Ingress Asymmetry Trap (`skb->sk == NULL`)

Before swapping `bpf_get_current_cgroup_id()` for `bpf_skb_cgroup_id(skb)` everywhere, understand the asymmetric kernel contract across directions:

1. **TC Egress (`tc filter ... egress` / `BPF_TCX_EGRESS`)**: Outbound packets transmitted by local sockets have **`skb->sk` populated** by the TCP/UDP stack before hitting the `qdisc`/`tc` egress hook. `bpf_skb_cgroup_id(skb)` accurately returns the exact cgroup v2 inode ID of the originating container or systemd unit.
2. **Forwarded Packets**: Packets routed *through* a Linux gateway (`ip_forward`) belong to **no local socket** (`skb->sk == NULL`), so `bpf_skb_cgroup_id(skb)` legitimately returns `0`.
3. **TC Ingress (`tc filter ... ingress` / `BPF_TCX_INGRESS`)**: Inbound frames arrive from the NIC driver *before* `ip_rcv_finish()` / early demux (`tcp_v4_early_demux`) attaches `skb->sk`! Consequently, **`bpf_skb_cgroup_id(skb)` returns `0` on raw TC ingress**.

To reliably resolve container cgroup IDs on **both** egress and ingress without misattributing traffic:

| Attribution Requirement | Hook Point | Socket Available (`skb->sk`)? | Recommended Kernel Mechanism |
| :--- | :--- | :--- | :--- |
| **Local outbound container traffic** | `tcx/egress` or `sched_cls` egress | **Yes** | `bpf_skb_cgroup_id(skb)` directly |
| **Inbound + outbound per-cgroup accounting** | `cgroup_skb/ingress` & `cgroup_skb/egress` | **Yes** (post-demux) | `bpf_get_current_cgroup_id()` is still wrong, but `bpf_skb_cgroup_id(skb)` / attached cgroup context works cleanly |
| **TC ingress early packet inspection** | `tcx/ingress` or `sched_cls` ingress | **No (`NULL`)** | Call `bpf_sk_lookup_tcp()` / `bpf_sk_lookup_udp()` inside TC (or correlate via a 4-tuple BPF `HASH` map populated by `cgroup/sock_create` + TC egress, and `bpf_sk_release()` any looked-up socket!) |

---

## 5. Multi-Arch `bpf2go` CO-RE Drift & Userspace FD Teardown Races

Even if your C code is flawless, two deployment-layer mistakes routinely break multi-architecture appliances (x86_64 servers + ARM64 edge nodes) and crash Go control-plane daemons during live policy reloads.

### 5.1 When `-target bpfel` Works vs. When You Must Compile `-target amd64,arm64`

With **`cilium/ebpf`**'s `bpf2go` generator, engineers often pass `-target bpfel` across every `.c` file to emit a single `*_bpfel.go` / `*_bpfel.o` pair. That works **only** for programs whose ABI is genuinely architecture-independent:

- **Portable with `-target bpfel`**: `xdp`, `tc`/`sched_cls`, `cgroup_skb`, `socket_filter`, and **BTF trampolines (`lsm/*`, `fentry/*`, `fexit/*`)** that access arguments exclusively via `BPF_PROG(...)` + CO-RE **`BPF_CORE_READ()`** (`vmlinux.h` relocations patched at load time by libbpf/`cilium/ebpf`).
- **Broken on ARM64 with `-target bpfel` + x86 headers**: Any **`kprobe`**, **`kretprobe`**, **`uprobe`**, or **`perf_event`** program using `PT_REGS_PARM1(ctx)` / `struct pt_regs`! Why? Because `bpf_tracing.h` resolves `PT_REGS_PARM1` at **compile time** using `#define __TARGET_ARCH_x86` vs `#define __TARGET_ARCH_arm64` (reading `ctx->di` on x86_64 vs `ctx->regs[0]` on arm64), and including `-I/usr/include/x86_64-linux-gnu` while running on an ARM64 Linux kernel reads garbage registers or fails BTF/struct layout!

Configure `gen.go` explicitly per program class:

```go
package bpf

// Portable XDP & BTF-trampoline LSM programs (pass -mcpu=v3 for ALU64 signed jumps & ALU32):
//go:generate go run github.com/cilium/ebpf/cmd/bpf2go -no-strip -target bpfel -cc clang FlowTracker flow_tracker.c -- -mcpu=v3 -I/usr/include/bpf -I/usr/include/aarch64-linux-gnu -I/usr/include/x86_64-linux-gnu
//go:generate go run github.com/cilium/ebpf/cmd/bpf2go -no-strip -target bpfel -cc clang -type lsm_exe_id -type lsm_event LsmGuard lsm_guard.c -- -mcpu=v3 -I/usr/include/bpf -I/usr/include/aarch64-linux-gnu -I/usr/include/x86_64-linux-gnu

// Architecture-dependent pt_regs programs (kprobe/uprobe/perf_event): MUST split amd64 and arm64!
//go:generate go run github.com/cilium/ebpf/cmd/bpf2go -no-strip -target amd64,arm64 -cc clang -type ring_event -type runtime_cfg ThreatMonitor threat_monitor.c -- -mcpu=v3 -I. -I/usr/include/aarch64-linux-gnu -I/usr/include/x86_64-linux-gnu
```

Notice what `-target amd64,arm64` outputs:
- `threatmonitor_x86_bpfel.go` (`//go:build amd64`) + `threatmonitor_x86_bpfel.o`
- `threatmonitor_arm64_bpfel.go` (`//go:build arm64`) + `threatmonitor_arm64_bpfel.o`

And remember a classic multi-arch Makefile/container build trap: make sure `-target amd64,arm64` passes `-D__TARGET_ARCH_x86` vs `-D__TARGET_ARCH_arm64` cleanly (which `bpf2go`'s arch targets inject automatically when given `amd64,arm64` rather than generic `bpfel`), and **delete any stale `*_bpfel.o` / `*_bpfel.go`** left over from before splitting architectures so Go's embed/build system doesn't accidentally compile conflicting symbols.

![Isometric Dark Cyberpunk Cutaway of Dual-Architecture Silicon and Ring-0 eBPF Execution Chamber](/images/ebpf-ring0-cyberpunk-foundry.jpg)
*Figure 3: Dual-architecture x86_64 and ARM64 compute planes feeding unified BTF/CO-RE policies and split `pt_regs` artifacts into a synchronized Go userspace `objsMu` control boundary.*

### 5.2 Synchronizing `cilium/ebpf` Object Lifecycles (`objsMu`) in Go

Look closely at the userspace side of a Go eBPF daemon (`GuardManager`). A surprisingly frequent production panic/race happens between:
1. A control-plane HTTP/gRPC handler calling `SetPolicy(...)` -> `m.objs.PolicyConfig.Put(...)`;
2. `Start(...)` rolling back on partial hook failure (e.g., `LoadAndAssign` succeeded, 4 of 5 `link.AttachLSM` calls failed, or `ringbuf.NewReader` failed);
3. `Stop()` tearing down `rbReader`, `links`, and `objs` concurrently while a config watcher triggers `SetPolicy()`.

If `m.objs` is not guarded by a dedicated **`objsMu sync.RWMutex`**, `Stop()` can call `m.objs.Close()` while `SetPolicy()` holds a stale `*ebpf.Map` pointer—leading to `EBADF` errors, nil-pointer panics, or worst of all, **writing eBPF policy flags into a recycled file descriptor** inside the same process!

Here is the hardened lifecycle template:

```go
type GuardManager struct {
	mu       sync.RWMutex
	objsMu   sync.RWMutex
	objs     ebpf.LsmGuardObjects
	links    []link.Link
	rbReader *ringbuf.Reader
	doneChan chan struct{}
	stopOnce sync.Once
	attached bool
}

func (m *GuardManager) Start(cfg PolicyConfig) error {
	spec, err := ebpf.LoadLsmGuard()
	if err != nil {
		return fmt.Errorf("loading LsmGuard spec: %w", err)
	}

	m.objsMu.Lock()
	if err := spec.LoadAndAssign(&m.objs, nil); err != nil {
		m.objsMu.Unlock()
		return fmt.Errorf("loading LsmGuard objects: %w", err)
	}

	cleanupOnErr := func() {
		for _, l := range m.links {
			_ = l.Close()
		}
		m.links = nil
		_ = m.objs.Close()
		m.objs = ebpf.LsmGuardObjects{} // Zero struct so stale *ebpf.Map pointers cannot survive!
		m.objsMu.Unlock()
	}

	if err := m.attachHooksLocked(cfg); err != nil || len(m.links) == 0 {
		cleanupOnErr()
		return fmt.Errorf("attaching LSM hooks: %w", err)
	}

	rb, err := ringbuf.NewReader(m.objs.Events)
	if err != nil {
		cleanupOnErr()
		return fmt.Errorf("opening ringbuf reader: %w", err)
	}
	m.rbReader = rb
	m.doneChan = make(chan struct{})
	m.objsMu.Unlock()

	m.mu.Lock()
	m.attached = true
	m.mu.Unlock()

	go m.consumeRingbuf(rb, m.doneChan)
	return nil
}

func (m *GuardManager) SetPolicy(enforce bool) {
	if m == nil {
		return
	}
	m.objsMu.RLock()
	defer m.objsMu.RUnlock()
	if m.objs.PolicyConfig == nil {
		return
	}
	var val uint32
	if enforce {
		val = 1
	}
	_ = m.objs.PolicyConfig.Put(uint32(0), val)
}

func (m *GuardManager) Stop() {
	if m == nil {
		return
	}
	m.stopOnce.Do(func() {
		m.objsMu.Lock()
		if m.rbReader != nil {
			_ = m.rbReader.Close()
			<-m.doneChan // Wait for consumer goroutine exit BEFORE closing maps!
			m.rbReader = nil
		}
		for _, l := range m.links {
			_ = l.Close()
		}
		m.links = nil
		_ = m.objs.Close()
		m.objs = ebpf.LsmGuardObjects{}
		m.objsMu.Unlock()

		m.mu.Lock()
		m.attached = false
		m.mu.Unlock()
	})
}
```

Three critical invariants live in those 60 lines:
- **Zeroing `m.objs = ebpf.LsmGuardObjects{}`** inside both `cleanupOnErr()` and `Stop()` ensures a post-stop `SetPolicy()` observes `m.objs.PolicyConfig == nil` instead of dereferencing a closed map FD.
- **Passing `rb` and `doneChan` explicitly** to `consumeRingbuf` and waiting on `<-m.doneChan` *after* `rbReader.Close()` guarantees the reader goroutine has exited before `m.objs.Close()` tears down the underlying ring-buffer `mmap()` region.
- **No lock inversion**: `objsMu` strictly guards kernel FD lifetimes; `mu` strictly guards userspace status metadata. Never acquire `objsMu` while holding `mu` on one path and the reverse on another.

---

## 6. Automated Verifier CI Pipeline & Production Failure-Mode Matrix

Do not wait until a canary deployment hits an LTS 6.1 or 6.12 kernel to discover that an LLVM upgrade rewrote a register spill. Add these three checks directly into your CI test loop:

### 1. Audit Clang Bytecode Before Merging
Compile with strict flags and inspect exit and helper registers whenever touching `barrier_var()` paths:

```bash
clang -O2 -g -target bpf -mcpu=v3 -Wall -Werror -c lsm_guard.c -o lsm_guard.o
llvm-objdump -S --no-show-raw-insn lsm_guard.o | grep -A 12 'clamp_lsm_ret\|bpf_skb_load_bytes'
```

Verify visually that **`w0 = ...`** never appears on an LSM `exit` path and that **`wN &= 7` / `wN &= 31`** directly precedes `call bpf_skb_load_bytes`.

### 2. Exercise Real Edge Cases via `BPF_PROG_TEST_RUN` (`prog.Test`)
Unit-test your compiled eBPF objects directly inside Linux namespaces/CI runners using `cilium/ebpf`'s `Program.Test()` (`BPF_PROG_TEST_RUN`):
- Feed synthetic IPv4 Ethernet+IP+TCP `SYN` frames carrying **32, 36, 39, and 40 bytes of TCP options** (`doff = 13..15`) and assert your parsed option fields match byte-for-byte.
- Feed **both** a non-initial IPv4 fragment (`frag_off = htons(0x00B9)`) and an initial IPv6 fragment (`NH = 44`, `frag_off = htons(0x0001)` i.e. `offset=0, M=1`) plus a trailing IPv6 fragment (`frag_off = htons(0x0400)` i.e. `offset=8192B, M=0`) carrying fake `0x02` (`SYN`) / `0x04` (`RST`) bytes at L4 offset `+0..13`—asserting that initial IPv6 `M=1` parses L4 ports while trailing fragments count L3 bytes **without** incrementing `SYN`/`RST` counters.

### Complete Production Failure-Mode & Remediation Matrix

| Failure Domain | Symptom / Kernel Error | Exact Root Cause | Production Remediation | CI / Runtime Verification |
| :--- | :--- | :--- | :--- | :--- |
| **BPF-LSM Return Code** | `R0 has smin=-2147483648 smax=-1 should have been in [-4095, 0]` | `int` return zero-extends `w0`; or LLVM splits comparison (`w1`) from returned `r2`; or `-mcpu=v1` lacks `BPF_JSLT` | Return `long BPF_PROG(...)`, compile with `-mcpu=v3`, clamp via `clamp_lsm_ret()` with `barrier_var(r)` | `llvm-objdump -S` confirms `if r1 s< -4095` + `r0 = r1`; load test on target kernel |
| **Variable `bpf_probe_read_kernel`** | Verifier OOB / negative scalar on `sockaddr` tail read | Reading `sizeof(struct sockaddr_alg)` on shorter binds, or unbarriered `addrlen - 24` | Read fixed `24B` header after `addrlen >= 25`, then clamp + `barrier_var(name_len)` | `BPF_PROG_TEST_RUN` or bind fuzz test with `16B`, `25B`, `40B`, `128B` `sockaddr` |
| **`bpf_skb_load_bytes` Bitmasking** | `32..39B` TCP options silently truncated to `0..7B` (zero-byte crash or lost fingerprint) | Single `& 0x1F` wraps bit 5 (`32 -> 0`, `36 -> 4`); LLVM elides mask without barrier | Branch `>= 40` -> `40`; `32..39` -> `32 + (rem & 0x07)`; `< 32` -> `len & 0x1F` with `barrier_var()` + double mask | `Program.Test()` across `doff=5..15` (`opt_len` = `0, 20, 32, 36, 39, 40`) |
| **XDP Pre-Reassembly Fragments** | Fake `SYN`/`RST` spikes; valid IPv6 fragmented `M=1` traffic skipped | XDP sees unreassembled frames; copying IPv4 `0x1FFF` to IPv6 hits `M=1` bit & misses upper offset bits | IPv4: `(frag_off & bpf_htons(0x1FFF)) == 0`; IPv6 `NH=44`: `(frag_off & bpf_htons(0xFFF8)) != 0` | `Program.Test()` with `M=1,off=0` and `M=0,off=8192` crafted Scapy/Go raw frames |
| **TC SoftIRQ Cgroup Attribution** | Container flows tagged with `ksoftirqd` or random interrupted task cgroup ID | `bpf_get_current_cgroup_id()` reads `current` inside `NET_RX/TX_SOFTIRQ` | Use `bpf_skb_cgroup_id(skb)` on TC egress; use `cgroup_skb` or 4-tuple sock map / `bpf_sk_lookup_*` on ingress | Egress packet capture under background CPU load verifying stable pod cgroup ID |
| **Multi-Arch `bpf2go` Targets** | ARM64 node crashes/misreads arguments or embeds stale x86 `.o` | `-target bpfel` + x86 headers used for `pt_regs` hooks (`kprobe`/`uprobe`) | Keep `-target bpfel` + `-mcpu=v3` for XDP/TC/LSM BTF trampolines; split `-target amd64,arm64` for `pt_regs` hooks | `CGO_ENABLED=0 GOARCH=arm64 go build ./...` + purge stale single-arch `.o` files |
| **Userspace Go FD Lifecycle** | `EBADF`, `nil` map panic, or silent FD corruption on reload/shutdown | Concurrent `Map.Put()` racing `Stop()` (`objs.Close()`) or partial-attach `Start()` error | Protect `m.objs` with `objsMu sync.RWMutex`, drain `<-doneChan` before `objs.Close()`, zero `m.objs` on teardown | `go test -race ./...` stressing concurrent `Start()`/`SetPolicy()`/`Stop()` loops |

---

## Closing Thought

The eBPF verifier is not an arbitrary obstacle to be appeased with blind bitmasks—it is a static proof assistant operating on the **exact LLVM instruction stream**, not on the C source you thought you wrote. Pairing `-mcpu=v3` and surgical `barrier_var()` fences with strict protocol-bit accuracy (`0x1FFF` vs. `0xFFF8`), softIRQ context awareness (`bpf_skb_cgroup_id`), explicit multi-architecture `bpf2go` targets, and synchronized Go FD teardown turns Ring-0 kernel instrumentation from fragile black magic into deterministic, testable systems infrastructure.
