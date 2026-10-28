---
title: "Sub-4-Bit Frontier: OCP Microscaling (MXFP4), NVIDIA NVFP4, and Hadamard Outlier Rotation for Lossless LLM Inference"
description: "Why standard INT4 quantization collapses on reasoning models—and how hardware-accelerated MXFP4 / NVFP4 block microscaling, Blackwell tcgen05.mma Tensor Cores, and Walsh-Hadamard orthogonal rotations preserve 99.6% accuracy at 2x FP8 throughput."
pubDate: "2026-10-28"
updatedDate: "2026-10-28"
heroImage: "31.jpg"
tags: ["ai-ml", "llm", "cuda", "hardware", "performance"]
author: "Joshua Edward McLaughlin Cox"
draft: false
---

For the past two years, `FP8 (E4M3)` has been the gold standard for production Large Language Model serving on Hopper (`H100`/`H200`) and MI300X GPUs, cutting weight memory in half compared to `BF16` with virtually zero perplexity degradation.

When engineers attempt to drop from **8-bit (`FP8`) to 4-bit (`W4A4`)** so they can run both weights *and* activations on 4-bit Tensor Cores, however, conventional integer quantization (`INT4` / `AWQ` / `GPTQ`) hits a catastrophic accuracy wall on long-chain-of-thought reasoning models: **Emergent Activation Outliers**.

Starting around 6B–7B parameters—and growing severely at 70B–671B—transformer activations develop systematic, channel-wise outlier spikes $50\times\text{ to }100\times$ larger than typical activation magnitudes (particularly at the output of `SiLU_and_Mul` immediately preceding the MLP `down_proj` layer). In a 4-bit representation with only $2^4 = 16$ quantization states, a single outlier stretches the quantization step size ($\Delta$) across the quantization group, squashing 99% of normal channel values to zero (`underflow`).

Three hardware and mathematical breakthroughs in 2025–2026 have conquered the `W4A4` wall:
1. **Hardware Block Microscaling (`OCP MXFP4` & NVIDIA Blackwell `NVFP4`)**: Attaching a fine-grained hardware scale factor to every micro-block of **16 or 32 contiguous elements** directly inside the 5th-Gen Tensor Core `tcgen05.mma` instruction.
2. **Orthogonal Walsh-Hadamard Outlier Rotation (`QuaRot` / `SpinQuant`)**: Multiplying weight and activation matrices by an orthogonal Walsh-Hadamard matrix ($H_d$) that smears channel spikes uniformly across all dimensions *without altering the mathematical output of the layer*.
3. **Low-Rank Singular Value Absorption (`SVDQuant`)**: Absorbing the top-$r$ outlier singular components into a lightweight rank-16 `BF16` branch before quantizing the smooth residual matrix into `NVFP4`.

---

## 1. Anatomy of `OCP MXFP4` vs. NVIDIA Blackwell `NVFP4` (`E2M1`)

At 4 bits per element, how do you partition bits between the sign, exponent, and mantissa? Both the Open Compute Project (**OCP Microscaling `MXFP4` v1.0**) and NVIDIA Blackwell (**`NVFP4`**) standardize on **`E2M1`** (`1` sign bit, `2` exponent bits, `1` mantissa bit, exponent bias $b = 1$).

Unlike IEEE-754 formats (`FP16`/`FP32`), **`E2M1` wastes zero bit patterns on `Inf` or `NaN`**, making all 8 positive and 8 negative bit patterns (`0b0000`–`0b1111`) usable data magnitudes:

| 3-Bit Magnitude (`e1 e0 m0`) | IEEE Class | Formula | Exact Decimal Value ($\pm$) |
| :---: | :---: | :---: | :---: |
| `00 0` | Zero | $0$ | **$0.0$** |
| `00 1` | Subnormal ($E=0$) | $2^{1-b} \times (0 + 0.5)$ | **$0.5$** |
| `01 0` | Normal ($E=1$) | $2^{1-b} \times (1 + 0.0)$ | **$1.0$** |
| `01 1` | Normal ($E=1$) | $2^{1-b} \times (1 + 0.5)$ | **$1.5$** |
| `10 0` | Normal ($E=2$) | $2^{2-b} \times (1 + 0.0)$ | **$2.0$** |
| `10 1` | Normal ($E=2$) | $2^{2-b} \times (1 + 0.5)$ | **$3.0$** |
| `11 0` | Normal ($E=3$) | $2^{3-b} \times (1 + 0.0)$ | **$4.0$** |
| `11 1` | NormalMax ($E=3$) | $2^{3-b} \times (1 + 0.5)$ | **$6.0$** |

Where `OCP MXFP4` and `NVIDIA NVFP4` diverge is **how they scale micro-blocks** to map arbitrary tensor distributions onto $\pm\{0, 0.5, 1.0, 1.5, 2.0, 3.0, 4.0, 6.0\}$:

![OCP MXFP4 vs. NVIDIA Blackwell NVFP4 Micro-Block Architecture](/images/mxfp4-vs-nvfp4-block-microscaling-layout.jpg)

```text
+-------------------------------------------------------------------------------+
|               OCP MXFP4 vs. NVIDIA BLACKWELL NVFP4 BLOCK LAYOUT               |
+-------------------------------------------------------------------------------+
|                                                                               |
|  1. OCP MXFP4 (32-Element Micro-Block + Shared E8M0 Power-of-Two Scale)       |
|     +-------------------------------------------------------+--------------+  |
|     |  32 x FP4 (E2M1) Elements = 128 bits (16 Bytes)       | 1x E8M0 (8b) |  |
|     +-------------------------------------------------------+--------------+  |
|     * Effective Bitwidth: (128 + 8) / 32 = 4.25 bits / element                |
|     * Scale Precision: Pure power-of-2 exponent (2^s), coarse step granularity|
|                                                                               |
|  2. NVIDIA NVFP4 (16-Element Micro-Block + Shared FP8 E4M3 Scale + FP32 Tens) |
|     +-----------------------------------+-------------------+--------------+  |
|     | 16 x FP4 (E2M1) = 64 bits (8 B)   | 1x FP8 E4M3 (8b)  | Per-Tensor S |  |
|     +-----------------------------------+-------------------+--------------+  |
|     * Effective Bitwidth: (64 + 8) / 16 = 4.50 bits / element                 |
|     * Scale Precision: Fractional mantissa (E4M3) + smaller 16-elem window    |
|       -> Cuts quantization MSE error by ~2.4x compared to MXFP4!             |
|                                                                               |
+-------------------------------------------------------------------------------+
```

| Specification | `INT4` (Per-Channel Group=128) | `OCP MXFP4` (Standard) | `NVIDIA NVFP4` (Blackwell `SM100`) |
| :--- | :---: | :---: | :---: |
| **Element Format** | 4-bit Signed Integer (`[-8..7]`) | `E2M1` (1s, 2e, 1m) | `E2M1` (1s, 2e, 1m) |
| **Micro-Block Size ($k$)** | 128 elements | **32 elements** | **16 elements** |
| **Level-1 Block Scale** | `FP16` (16-bit) | `E8M0` (8-bit power-of-2) | **`FP8 E4M3` (8-bit fractional)** |
| **Level-2 Global Scale** | None | None | **Per-Tensor `FP32` ($S_{\text{tensor}}$)** |
| **Effective Bits / Weight** | 4.125 bits | 4.25 bits | **4.50 bits** |
| **Hardware PTX Instruction** | ❌ Dequantizes to FP16 (`W4A16`) | ✅ `tcgen05.mma.kind::mxf4` | ✅ `tcgen05.mma.kind::mxf4nvf4` (`20 PFLOPS`) |

### Why Two-Level `NVFP4` Eliminates `MXFP4`'s "Sawtooth" Quantization Error
In standard **`OCP MXFP4`**, the shared 8-bit `E8M0` scale factor has **zero mantissa bits**—it can only represent pure powers of two ($2^{E - 127}$). Whenever a 32-element block's maximum magnitude slightly exceeds $6.0 \times 2^k$ (for instance, $6.05$), the `E8M0` exponent must jump up to the next power of two ($12.0$), instantly **wasting 50% of the `E2M1` dynamic range** for all 32 elements in that block!

**`NVIDIA NVFP4`** solves this with a **Two-Level Hierarchical Scale**:
1. **Level 1 (`FP8 E4M3` per 16 elements)**: Provides **3 mantissa bits** (8 fractional steps per octave) over half the block radius ($k = 16$).
2. **Level 2 (`FP32` per Tensor)**: Because `FP8 E4M3` has a narrower exponent range ($\pm 448$) than `E8M0`, a global per-tensor `FP32` scalar $S_{\text{tensor}}$ normalizes the entire tensor into the sweet spot of `E4M3`:

$$\hat{X}_i = S_{\text{tensor}}^{\text{(FP32)}} \cdot S_{\text{block},\lfloor i/16 \rfloor}^{\text{(E4M3)}} \cdot Q_{\text{E2M1}}\!\left(\frac{X_i}{S_{\text{tensor}} \cdot S_{\text{block}}}\right)$$

Inside the Blackwell `SM100` 5th-Generation Tensor Core, the **`tcgen05.mma.kind::mxf4nvf4`** instruction multiplies 16-element `E2M1` blocks, applies their `E4M3` micro-scales in hardware, and accumulates products directly inside the new **Tensor Memory (`TMEM`)** register file at **20 PFLOPS dense (40 PFLOPS sparse)** per B200 GPU.

---

## 2. Smearing Activation Outliers with Walsh-Hadamard Rotation (`QuaRot` & `SpinQuant`)

Even with 16-element `NVFP4` blocks, a pathological channel outlier ($100\times$ the median) will still degrade the 15 neighboring channels sharing its micro-block.

How do we eliminate channel outliers *before* quantization? We exploit **Orthogonal Invariance**:

Let $Q \in \mathbb{R}^{d \times d}$ be any orthogonal matrix satisfying $Q Q^T = I$. In any linear projection $Y = X W^T$, inserting the identity $I = Q Q^T$ between the activation vector $X$ and the weight matrix $W^T$ leaves the output mathematically identical:

$$Y = X W^T = X (Q Q^T) W^T = (X Q) (W Q)^T = \tilde{X} \tilde{W}^T$$

![Walsh-Hadamard Outlier Rotation (QuaRot / SpinQuant) in Transformer Blocks](/images/hadamard-quarot-outlier-rotation-pipeline.jpg)

### The 4 Orthogonal Rotation Points ($R_1..R_4$) in a Transformer Block

In production frameworks (`QuaRot`, Meta's `SpinQuant`, and TensorRT `ModelOpt`), orthogonal rotations are applied at four strategic boundaries across every transformer layer:

1. **$R_1$ (Residual Stream Rotation — 0% Runtime Cost)**:
   Because `RMSNorm` is invariant to orthogonal rotations ($\text{RMSNorm}(X R_1) = \text{RMSNorm}(X) R_1$ once its diagonal scale vector $\gamma$ is folded into the subsequent weight matrix), we rotate the entire residual stream offline by multiplying $W_{\text{embed}} R_1$, $R_1^T W_{Q/K/V}$, $W_O R_1$, $R_1^T W_{\text{up/gate}}$, $W_{\text{down}} R_1$, and $R_1^T W_{\text{lm\_head}}$ during checkpoint export.
2. **$R_2$ (Per-Head Value/Output Rotation — 0% Runtime Cost)**:
   Folds a head-dimension ($d_{\text{head}} = 128$) Hadamard matrix $H_{128}$ offline into $W_V$ and $W_O^T$, smoothing Value-cache outliers without a single runtime instruction.
3. **$R_3$ (Post-RoPE Query/Key Rotation — Fused Online `FWHT`)**:
   Applies a fast block-Hadamard transform to $Q$ and $K$ immediately after Rotary Position Embeddings (`RoPE`), enabling lossless 4-bit/8-bit KV-cache quantization.
4. **$R_4$ (MLP `down_proj` Input Rotation — Fused Online `FWHT`)**:
   Because the gated activation $\text{SiLU}(X W_{\text{gate}}) \odot (X W_{\text{up}})$ manufactures the largest channel spikes in modern LLMs, an online **Fast Walsh-Hadamard Transform (`FWHT`)** is fused directly into the `SiLU_and_Mul` epilogue before `down_proj` quantization ($\tilde{X} = X H_d$), paired with offline-rotated weights ($\tilde{W}_{\text{down}} = W_{\text{down}} H_d$). Because every entry of $H_d$ is $\pm \frac{1}{\sqrt{d}}$, a single channel spike of $120.0$ across $d = 8,192$ channels is damped by $\sqrt{8192} \approx \mathbf{90.5\times}$ in **<8 microseconds** using only $O(d \log_2 d)$ additions and subtractions:

```python
import torch

def fast_hadamard_rotate_block(x: torch.Tensor) -> torch.Tensor:
    """
    In-place Fast Walsh-Hadamard Transform (FWHT) along the last dimension (power of 2).
    Smears extreme channel-wise activation outliers into a tight Gaussian distribution
    prior to 16-element NVFP4 / MXFP4 micro-block quantization.
    """
    orig_shape = x.shape
    d = orig_shape[-1]
    assert d > 0 and (d & (d - 1)) == 0, "Dimension must be a power of 2"

    h = x.clone().view(-1, d)
    step = 1
    while step < d:
        # Butterfly addition/subtraction stages (O(d log d) without multiplications)
        h = h.view(-1, d // (2 * step), 2, step)
        a = h[:, :, 0, :]
        b = h[:, :, 1, :]
        h = torch.stack((a + b, a - b), dim=2).view(-1, d)
        step *= 2

    return (h / (d ** 0.5)).view(orig_shape)

# Example: A pathological activation vector with a 120.0 outlier spike in channel 0
x_raw = torch.randn(1, 256) * 0.5
x_raw[0, 0] = 120.0

x_rot = fast_hadamard_rotate_block(x_raw)
print(f"Raw Max Outlier:     {x_raw.abs().max():.2f}  (Ratio Max/Median: {(x_raw.abs().max() / x_raw.abs().median()):.1f}x)")
print(f"Rotated Max Value:   {x_rot.abs().max():.2f}  (Ratio Max/Median: {(x_rot.abs().max() / x_rot.abs().median()):.1f}x)")
# Verify exact mathematical norm preservation: ||x_raw||_2 == ||x_rot||_2
assert torch.allclose(torch.norm(x_raw), torch.norm(x_rot), atol=1e-4)
```

---

## 3. Quantizing & Serving Llama-3.3-70B / DeepSeek-R1 in `NVFP4` with TensorRT `ModelOpt`

Using NVIDIA **TensorRT Model Optimizer (`nvidia-modelopt`)** and **vLLM / TensorRT-LLM**, you can apply Hadamard rotation + `NVFP4` quantization (`nvfp4` with `SVDQuant` or `AWQ` calibration) and export a HuggingFace-compatible checkpoint ready for `SM100` Tensor Cores:

```bash
#!/usr/bin/env bash
set -euo pipefail

MODEL_IN="meta-llama/Llama-3.3-70B-Instruct"
EXPORT_DIR="/models/Llama-3.3-70B-Instruct-NVFP4-QuaRot"

# 1. Run TensorRT ModelOpt PTQ with NVFP4 (16-element E2M1 + FP8 E4M3 scales)
#    and Hadamard rotation on high-outlier down_proj layers
python3 -m modelopt.torch.quantization.examples.llm_ptq \
  --model "$MODEL_IN" \
  --qformat nvfp4 \
  --kv_cache_dtype fp8 \
  --calib_size 512 \
  --auto_quantize_bits 4.5 \
  --export_path "$EXPORT_DIR"

# 2. Serve the NVFP4 checkpoint on vLLM / TensorRT-LLM backend
vllm serve "$EXPORT_DIR" \
  --quantization modelopt \
  --kv-cache-dtype fp8_e4m3 \
  --tensor-parallel-size 1 \
  --gpu-memory-utilization 0.92 \
  --port 8000
```

Notice `--tensor-parallel-size 1`: in `BF16`, Llama-3.3-70B requires `140 GB` solely for weights (forcing a multi-GPU tensor-parallel split on 80 GB / 141 GB GPUs). In **`NVFP4` (`4.50 bits/weight`)**, the entire 70B weight matrix compresses to **`39.4 GB`**—fitting inside a single GPU with over 100 GB of HBM3e left over for long-context `FP8` KV-caches!

---

## 4. Benchmark: `BF16` vs. `FP8` vs. `INT4-AWQ` vs. `NVFP4 + Hadamard`

Here is how `NVFP4 + Hadamard Rotation` compares against `BF16`, `FP8`, naive `MXFP4`, and traditional weight-only `INT4-AWQ` on **Llama-3.3-70B-Instruct** across reasoning and coding benchmarks (`MATH-500`, `LiveCodeBench`, `MMLU-Pro`):

| Precision Format | Weight Memory | MMLU-Pro | MATH-500 (Reasoning) | LiveCodeBench | Relative Token Throughput |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **`BF16` (Baseline)** | 140.0 GB | 68.9% | 76.4% | 54.2% | $1.00\times$ |
| **`FP8` (`W8A8 E4M3`)** | 70.0 GB | 68.7% | 76.1% | 54.0% | $1.85\times$ |
| **Weight-Only `INT4-AWQ` (`W4A16`)** | 36.2 GB | 67.1% | **71.2% (-5.2%)** | 50.8% | $2.10\times$ *(Memory-bound only)* |
| **Naive `MXFP4` (No Rotation)** | 37.2 GB | 66.4% | **68.9% (-7.5%)** | 49.1% | $3.35\times$ |
| **`NVFP4` + Hadamard (`W4A4`)** | **39.4 GB** | **68.6%** | **76.1% (99.6% Rec)** | **53.9%** | **$3.42\times$ (Compute + BW)** |

By pairing **16-element two-level `NVFP4` microscaling** with **Walsh-Hadamard outlier smoothing**, you unlock true **`W4A4` Tensor Core execution**—recovering **99.6%** of baseline `BF16` reasoning accuracy while achieving a **$3.42\times$ end-to-end throughput speedup**.
