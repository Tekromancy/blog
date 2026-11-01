---
title: "Inside FlashAttention-3 & Warp-Specialized CUDA Kernels: Asynchronous WGMMA, Tensor Memory Accelerator (TMA), and FP8 Ping-Pong Scheduling"
description: "How modern Hopper (SM90) and Blackwell (SM100) attention kernels shatter the 35% Tensor Core utilization wall by splitting threadblocks into Producer/Consumer Warpgroups with hardware TMA bulk transfers, mbarrier phase synchronization, and register-level Ping-Pong scheduling."
pubDate: "2026-11-01"
updatedDate: "2026-11-01"
heroImage: "36.jpg"
tags: ["ai-ml", "gpu", "performance", "cuda", "infrastructure"]
author: "Joshua Edward McLaughlin Cox"
draft: false
---

When **FlashAttention-2** launched on NVIDIA Ampere (`A100`, `SM80`), it achieved ~70% of theoretical peak FP16 FLOPs by fusing the $O(N^2)$ attention matrix $S = QK^T$ and online softmax rescaling inside on-chip SRAM. Yet when engineers compiled that exact same synchronous CUDA programming model onto **NVIDIA Hopper (`H100`/`H200`, `SM90`)**, Tensor Core utilization plummeted to **35%**.

Why did an architecture with 3x higher Tensor Core throughput (`989 TFLOPS` BF16 / `1,979 TFLOPS` FP8) stall for nearly two-thirds of every clock cycle under a FlashAttention-2 schedule?

Because on Hopper (`SM90`) and Blackwell (`SM100`), **data movement and Tensor Core matrix multiply-accumulate (`WGMMA` / `tcgen05.mma`) are fundamentally asynchronous hardware engines**, whereas non-Tensor-Core Special Function Units (`SFU` / `MUFU.EX2` used by `softmax`) remain synchronous and heavily throughput-limited:
- On an `H100 SXM5`, the 4th-generation Tensor Cores execute **1,024 FP16/BF16 operations per clock cycle per SM** (`wgmma.mma_async`), while the Special Function Unit (`SFU`) computes only **16 `exp2f` transcendental operations per clock cycle per SM**—a **64:1 throughput asymmetry**!
- Worse, in a classical homogeneous threadblock (`SIMT`), every warp executes the same instruction stream: load tile (`cp.async`), hit `__syncthreads()`, run `mma.sync`, hit `__syncthreads()`, and stall on `MUFU.EX2` softmax. While the `SFU` is computing `exp2`, both the **3.35 TB/s HBM3e bus** and the **Tensor Cores** sit completely idle.

**FlashAttention-3** and modern `CUTLASS 3.x` / `ThunderKittens` kernels break this wall—reaching **75%–85% Tensor Core utilization (up to 1.2 PFLOPS FP8 on Hopper and 2.25+ PFLOPS on Blackwell)**—through four hardware-software co-design primitives: **Warp Specialization (`setmaxnreg`)**, **Tensor Memory Accelerator (`TMA`) Circular Buffers with `mbarrier`**, **Two-Warpgroup Ping-Pong Overlapping**, and **Blackwell `SM100` Dedicated Tensor Memory (`TMEM`)**.

---

## 1. Warp Specialization: Producer Warpgroups vs. Consumer Warpgroups

In a traditional CUDA kernel, all warps in a Cooperative Thread Array (`CTA` / Threadblock) are symmetric workers. On `SM90+`, symmetric warps suffer from **Register Pressure Inversion**:
- Issuing asynchronous HBM-to-Shared-Memory (`SMEM`) transfers requires very few registers (`24–40 regs/thread`).
- Accumulating a $64 \times 128$ or $128 \times 128$ `WGMMA` tile in registers requires massive register files (`232–255 regs/thread`, hitting the hardware ceiling of 65,536 32-bit registers per SM).

Using PTX **`setmaxnreg.dec` / `setmaxnreg.inc`**, a Warp-Specialized kernel divides a 12-warp (3-Warpgroup, 384-thread) CTA into two asymmetric roles that execute completely independent control-flow loops:

![SM90 / SM100 Warp-Specialized CTA and Ping-Pong Execution Pipeline](/images/fa3-warp-specialized-ping-pong-pipeline.jpg)

```text
+-----------------------------------------------------------------------------------+
|         SM90 / SM100 WARP-SPECIALIZED CTA & PING-PONG EXECUTION PIPELINE          |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [ PRODUCER WARPGROUP 0 (Warps 0..3) — setmaxnreg.dec.sync.aligned 40 ]           |
|    ├── Issues `cp.async.bulk.tensor.2d` via Hardware TMA Engine (0 Addr Regs!)    |
|    ├── Streams K_j, V_j tiles from HBM3e -> 228 KB Shared Memory Circular Ring    |
|    └── Waits on `mbarrier.try_wait.parity` (Consumer Read-Complete Signal)        |
|                           |                                                       |
|                           v  (Hardware `mbarrier.arrive.expect_tx` in SMEM)       |
|  +-----------------------------------------------------------------------------+  |
|  |  CONSUMER WARPGROUP 1 (Warps 4..7)   |  CONSUMER WARPGROUP 2 (Warps 8..11)  |  |
|  |  `setmaxnreg.inc.sync.aligned 232`   |  `setmaxnreg.inc.sync.aligned 232`   |  |
|  +--------------------------------------+--------------------------------------+  |
|  | Step A: `wgmma.mma_async` (S = Q*K^T)| Step A: Softmax `MUFU.EX2` (SFU)     |  |
|  |   [Occupies Tensor Core Pipe 100%]   |   [Occupies SFU Pipe 100% in || !]   |  |
|  +--------------------------------------+--------------------------------------+  |
|  | Step B: Softmax `MUFU.EX2` (SFU)     | Step B: `wgmma.mma_async` (O += P*V) |  |
|  |   [Occupies SFU Pipe 100%]           |   [Occupies Tensor Core Pipe 100%!]  |  |
|  +-----------------------------------------------------------------------------+  |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

1. **Producer Warpgroup (`WG0`, 4 Warps / 128 Threads)**: Voluntarily relinquishes its unused registers back to the SM pool via `setmaxnreg.dec.sync.aligned.u32 40`. A single elected thread (`elect.sync`) inside `WG0` issues asynchronous **Tensor Memory Accelerator (`TMA`)** descriptors to stream $K_j$ and $V_j$ tiles from HBM3e into a multi-stage circular buffer in Shared Memory (`SMEM`).
2. **Consumer Warpgroups (`WG1` & `WG2`, 8 Warps / 256 Threads)**: Claim the donated registers via `setmaxnreg.inc.sync.aligned.u32 232`, holding the query tile $Q_i$, running online softmax statistics $(m_i, \ell_i)$, and output accumulator $O_i$ entirely in register file (`RMEM`) without spilling a single byte to local memory!

---

## 2. Hardware `TMA` (`cp.async.bulk.tensor`) & Transaction-Count `mbarrier`

Prior to Hopper, loading a multidimensional tensor tile $(B, H, N, D)$ from HBM into Shared Memory required every thread in the block to compute 64-bit stride offsets, evaluate boundary predicates for sequence lengths not divisible by 128, and issue `cp.async.cg.shared.global` 16 bytes at a time.

The **Tensor Memory Accelerator (`TMA`)** is a dedicated hardware DMA unit inside each SM that offloads address generation and out-of-bounds zero-padding completely:
- On the host, you initialize a 64-byte **`CUtensorMap`** descriptor (`cuTensorMapEncodeTiled`) describing the global HBM tensor base pointer, 5D dimensions, strides, and **128-byte SMEM swizzle layout** (`CU_TENSOR_MAP_SWIZZLE_128B`—which permutes shared memory bank addresses via bitwise XOR so `WGMMA` matrix reads suffer zero 32-way bank conflicts).
- Inside the kernel, **one single thread** issues `cp.async.bulk.tensor.2d.shared::cluster.global.mbarrier::complete_tx::bytes` while passing the expected byte count (`expect_tx`) to a hardware shared-memory barrier (`mbarrier_t`). The TMA engine transfers the entire $128 \times 128$ tile and atomically decrements the `mbarrier` transaction counter in silicon when the last cacheline lands in SMEM!

Here is how the Producer and Consumer Warpgroups synchronize over a $K$-stage circular SMEM ring using inline PTX `mbarrier` phase-bit flipping:

```cpp
// flash_attn3_warp_specialized_tma.cu — Producer/Consumer TMA + WGMMA Loop
#include <cuda.h>
#include <cuda_bf16.h>
#include <cute/tensor.hpp>

__device__ __forceinline__ void warpgroup_reg_dealloc_40() {
    asm volatile("setmaxnreg.dec.sync.aligned.u32 %0;\n" :: "n"(40));
}

__device__ __forceinline__ void warpgroup_reg_alloc_232() {
    asm volatile("setmaxnreg.inc.sync.aligned.u32 %0;\n" :: "n"(232));
}

template <int kStages = 3, int kTileBytes = 32768>
__device__ void producer_tma_loop(
    const CUtensorMap* __restrict__ tma_desc_K,
    const CUtensorMap* __restrict__ tma_desc_V,
    uint64_t* smem_mbar_full,   // Signaled by TMA hardware when tile arrives
    uint64_t* smem_mbar_empty,  // Signaled by Consumer WG when SMEM slot is free
    uint32_t smem_k_base,
    uint32_t smem_v_base,
    int num_kv_blocks,
    int head_offset_y)
{
    warpgroup_reg_dealloc_40(); // Donate 192 regs/thread to Consumer Warpgroups!

    if (threadIdx.x == 0) {     // Only 1 thread in Producer WG issues TMA commands
        int stage = 0;
        uint32_t phase = 0;

        for (int kv_idx = 0; kv_idx < num_kv_blocks; ++kv_idx) {
            // 1. Wait until Consumer Warpgroups finish reading this ring buffer slot
            while (!mbarrier_try_wait_parity(&smem_mbar_empty[stage], phase ^ 1)) {}

            // 2. Arm full_mbar with expected byte count (K tile + V tile)
            uint32_t mbar_addr = __cvta_generic_to_shared(&smem_mbar_full[stage]);
            asm volatile(
                "mbarrier.arrive.expect_tx.shared::cta.b64 _, [%0], %1;\n"
                :: "r"(mbar_addr), "n"(2 * kTileBytes) : "memory"
            );

            // 3. Issue hardware TMA 2D async bulk copy for K_j and V_j
            uint32_t dst_k = smem_k_base + stage * kTileBytes;
            uint32_t dst_v = smem_v_base + stage * kTileBytes;
            int coord_x = 0;
            int coord_y = head_offset_y + kv_idx * 128;

            asm volatile(
                "cp.async.bulk.tensor.2d.shared::cluster.global.mbarrier::complete_tx::bytes"
                " [%0], [%1, {%2, %3}], [%4];\n"
                :: "r"(dst_k), "l"(tma_desc_K), "r"(coord_x), "r"(coord_y), "r"(mbar_addr)
                : "memory"
            );
            asm volatile(
                "cp.async.bulk.tensor.2d.shared::cluster.global.mbarrier::complete_tx::bytes"
                " [%0], [%1, {%2, %3}], [%4];\n"
                :: "r"(dst_v), "l"(tma_desc_V), "r"(coord_x), "r"(coord_y), "r"(mbar_addr)
                : "memory"
            );

            stage = (stage + 1) % kStages;
            if (stage == 0) phase ^= 1;
        }
    }
}
```

---

## 3. Ping-Pong Scheduling & Intra-Warpgroup GEMM-Softmax Overlapping

Even with `TMA` keeping the Shared Memory circular buffer full at 3.35 TB/s, how do we hide the **64x slower `MUFU.EX2` softmax bottleneck**?

FlashAttention-3 introduces a two-level overlapping schedule:
1. **Inter-Warpgroup Ping-Pong (`bar.sync` Staggering)**: Consumer Warpgroup 1 (`WG1`, processing query tile $Q_{i,0}$) and Consumer Warpgroup 2 (`WG2`, processing query tile $Q_{i,1}$) are staggered by half an iteration using named hardware barriers (`asm volatile("bar.sync %0, 128;" :: "r"(barrier_id))`). While `WG1` monopolizes the Tensor Core pipeline executing `wgmma.mma_async` ($S_1 = Q_1 K_j^T$ and $O_1 \leftarrow O_1 + P_1 V_j$), `WG2` monopolizes the Special Function Units (`SFU`) executing `exp2f` online softmax rescaling on $S_2$—and then they swap roles!
2. **Intra-Warpgroup 2-Stage Software Pipelining**: Because `wgmma.mma_async.sync.aligned.m64n128k16` executes asynchronously without blocking the warp's ALU/SFU issue slot until `wgmma.wait_group.sync.aligned N`, a single warpgroup issues the *next* iteration's `WGMMA` ($S_{j+1} = Q K_{j+1}^T$) into the Tensor Core queue **before** calling `wgmma.wait_group 1` to compute softmax on $S_j$, and issues $O \leftarrow O + P_j V_j$ while $S_{j+1}$ is still in flight!

---

## 4. From Hopper `SM90` (`wgmma`) to Blackwell `SM100` (`tcgen05.mma` + `256 KB TMEM`)

On Hopper (`SM90`), holding both the $64 \times 128$ FP32 accumulator matrix $O_i$ and the current attention score tile $S_j$ inside the standard Register File (`RMEM`) pushes Consumer Warpgroups right to the 232-register-per-thread limit.

**NVIDIA Blackwell (`B200` / `SM100`, 5th-Gen Tensor Cores `tcgen05`)** eliminates register accumulator pressure entirely by introducing a brand-new on-chip memory hierarchy tier: **Dedicated Tensor Memory (`TMEM`)**:

![Hopper SM90 (WGMMA + RMEM) vs. Blackwell SM100 (TCGEN05 + 256KB TMEM)](/images/hopper-sm90-wgmma-vs-blackwell-sm100-tmem.jpg)

1. **256 KB of Dedicated `TMEM` per SM (`512 Columns x 128 Lanes` of 32-bit cells)**: Instead of storing matrix multiply accumulators in general-purpose registers (`RMEM`), `tcgen05.mma` reads operands from Shared Memory (`SMEM` or `TMEM`) and writes its FP32/FP16 accumulators **directly into `TMEM`** (`tcgen05.alloc` / `tcgen05.ld` / `tcgen05.st`).
2. **Single-Thread MMA Issue (`tcgen05.mma`)**: Whereas Hopper's `wgmma.mma_async` required all 128 threads of a 4-warp Warpgroup to execute the MMA instruction synchronously (`sync.aligned`), Blackwell's **`tcgen05.mma` is issued by a single elected thread** (just like `TMA`!), freeing the Consumer Warpgroups to run online `MUFU.EX2` softmax rescaling continuously while the 5th-Gen Tensor Core accumulates in `TMEM` in the background.
3. **2-CTA Cooperative Cluster MMA (`cta_group::2`)**: Two adjacent CTAs in a Threadblock Cluster can pool their Distributed Shared Memory (`DSMEM`) and `TMEM` to execute a single massive `m256n128k32` `tcgen05.mma.cta_group::2` instruction, halving $K_j$ / $V_j$ HBM reload bandwidth across query heads!

---

## 5. FP8 (`E4M3`) Block Quantization with Incoherent Hadamard Processing

When dropping from `BF16` (`989 TFLOPS` on H100 / `2.25 PFLOPS` on B200) to **`FP8 E4M3` (`1,979 TFLOPS` on H100 / `4.5 PFLOPS` on B200)**:
1. **Transpose via Shared Memory Byte Permute (`stmatrix` / `prmt`)**: The `SM90` FP8 `WGMMA` instruction requires both $P_j$ and $V_j$ to be contiguous along the reduction dimension $K$ (`k-major`). Since $V_j$ arrives from HBM contiguous along the head dimension $D$, the kernel performs an in-register `prmt.b32` byte shuffle paired with `stmatrix.sync.aligned.m8n8.x4.trans.shared.b16` to transpose $V_j$ in SMEM at full bank bandwidth.
2. **Block-Scale + Hadamard Outlier Smoothing**: Before quantizing $Q$ and $K$ to `FP8 E4M3`, applying a fast in-register $16 \times 16$ orthogonal Walsh-Hadamard transform ($Q' = Q H$, $K' = K H \implies Q' (K')^T = Q H H^T K^T = Q K^T$) eliminates outlier channels without altering the attention dot product—reducing FP8 attention RMSE by **2.6x** compared to naive per-tensor FP8 scaling!

| Attention Kernel Implementation ($N=8192, D=128$, Causal) | Silicon / Precision | Measured TFLOPS/s | % of Peak Tensor Core FLOPs | Relative Speedup |
| :--- | :---: | :---: | :---: | :---: |
| **PyTorch `sdpa` (cuDNN / Standard Math)** | `H100 SXM5` (`BF16`) | 312 TFLOPS | 31.5% | `1.00x` |
| **FlashAttention-2 (Homogeneous CTA, `cp.async`)** | `H100 SXM5` (`BF16`) | 415 TFLOPS | 42.0% | `1.33x` |
| **FlashAttention-3 (Warp-Specialized `TMA` + Ping-Pong)** | `H100 SXM5` (`BF16`) | **742 TFLOPS** | **75.0%** | **`2.38x`** |
| **FlashAttention-3 FP8 (`E4M3` + Hadamard Block-Scale)** | `H100 SXM5` (`FP8`) | **1,195 TFLOPS** | **60.4% (of 2 PFLOPS!)** | **`3.83x`** |
| **Warp-Specialized `tcgen05.mma` + `TMEM` Attention** | `B200 SXM6` (`FP8`) | **3,080 TFLOPS** | **68.4% (of 4.5 PFLOPS!)** | **`9.87x`** |

By treating the GPU not as a uniform SIMD array, but as a **heterogeneous dataflow processor** with decoupled `TMA`, `WGMMA`/`tcgen05`, `TMEM`, and `SFU` pipelines coordinated via `mbarrier`, Warp-Specialized kernels unlock 2.4x–3.8x higher attention throughput on the exact same silicon.
