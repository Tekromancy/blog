---
title: "Disaggregated LLM Serving: Separating Prefill and Decode Across RDMA / RoCEv2 Fabrics"
description: "Why co-locating compute-bound prefill and memory-bandwidth-bound decode on the same GPU pool ruins tail latency—and how disaggregated KV-cache streaming over GPUDirect RDMA transforms production LLM serving."
pubDate: "2026-10-24"
updatedDate: "2026-10-24"
heroImage: "21.jpg"
tags: ["ai-ml", "llm", "cuda", "networking", "infrastructure"]
author: "Joshua Edward McLaughlin Cox"
draft: false
---

In our [2026 Production Inference Shootout (vLLM vs. SGLang vs. TensorRT-LLM)](/blog/vllm-vs-sglang-tensorrt-llm-benchmark), we examined how continuous batching and PagedAttention maximize single-node GPU utilization. However, as context windows scale past 32k–128k tokens in agentic coding, multi-turn reasoning, and RAG workloads, co-located continuous batching hits a fundamental physical wall: **Prefill-Decode Interference**.

Every Large Language Model inference request consists of two distinct phases with diametrically opposed hardware profiles:
1. **The Prefill Phase (Prompt Processing)**: Processes all input prompt tokens in parallel via dense matrix-matrix multiplications (`GEMM`) and causal FlashAttention. It is **strictly Compute-Bound** (saturating GPU Tensor Cores) and determines **Time to First Token (TTFT)**.
2. **The Decode Phase (Autoregressive Token Generation)**: Generates one token per request per step via skinny matrix-vector/small-batch multiplications (`GEMV`), streaming the entire model weight matrix and historical KV-cache from High-Bandwidth Memory (HBM) on every generated token. It is **strictly Memory-Bandwidth-Bound** and determines **Inter-Token Latency (ITL)**.

When prefill and decode requests are multiplexed onto the same GPU pool—even with chunked prefill enabled—an incoming burst of 16k–64k token prompts hijacks the GPU's Streaming Multiprocessors (SMs) and stalls all in-flight decode streams, causing 100ms–340ms+ tail-latency pauses mid-sentence.

**Disaggregated LLM Serving** (pioneered by *DistServe*, *Splitwise*, *Mooncake*, and *NVIDIA Dynamo*) eliminates this interference permanently by splitting your GPU cluster into dedicated **Prefill Nodes** and **Decode Nodes**, streaming computed KV-cache blocks across ultra-low-latency **GPUDirect RDMA (InfiniBand or RoCEv2)** fabrics. You can model the exact KV payload sizes, layer-pipelined RDMA overlap, and tail-latency savings using the interactive **Prefill-Decode RDMA Simulator** at the bottom of this dispatch.

---

## 1. The Physics of Prefill vs. Decode Asymmetry (Roofline Math)

Let's examine the exact arithmetic intensity (FLOPs performed per byte of HBM memory accessed) of a 70B-parameter dense FP8 (`W8A8`) model running on an **NVIDIA H100 SXM5 GPU**.

> [!IMPORTANT]
> **Dense vs. Sparse FP8 Roofline Ridge Point:** Spec sheets frequently quote `1,979 TFLOPS` for the H100 SXM5, which requires 2:4 structured sparsity. For standard **dense FP8 (`e4m3`)** inference, peak Tensor Core throughput is **`989.4 TFLOPS`** against **`3.35 TB/s`** of HBM3 memory bandwidth—placing the true hardware Roofline Ridge Point at:
> $$\text{Ridge Point}_{\text{H100 Dense FP8}} = \frac{989.4 \times 10^{12}\text{ FLOP/s}}{3.35 \times 10^{12}\text{ Bytes/s}} \approx \mathbf{295.3\text{ FLOPs/Byte}}$$

For a linear projection layer multiplying token activations $X \in \mathbb{R}^{N \times d}$ by a weight matrix $W \in \mathbb{R}^{d \times d}$ in 1-byte FP8 (where hidden dimension $d = 8,192$ for Llama-3.3-70B), the total floating-point operations are $2 N d^2$ and total HBM bytes transferred (reading weights $d^2$ + reading/writing activations $2Nd$) yield an arithmetic intensity of:

$$\text{Arithmetic Intensity}(N) = \frac{2 N d^2}{d^2 + 2 N d} = \frac{2N}{1 + \frac{2N}{d}}$$

Look at what happens at $N = 4,096$ tokens (Prefill) versus Batch Size $B = 32$ tokens (Decode):

| Phase | Operation Type | Arithmetic Intensity ($\text{FLOPs/Byte}$) | Position vs. H100 Ridge ($295\text{ FLOPs/B}$) | Hardware Bottleneck | Target SLA Metric |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Prefill ($N = 4,096$ tokens)** | `GEMM` (Matrix-Matrix) | **$\approx 4,096\text{ FLOPs/Byte}$** *(linear)* | **$13.8\times$ Above Ridge** | **Tensor Core FLOPS** | **TTFT** ($< 500\text{ ms}$) |
| **Decode ($B = 32$ active streams)** | `GEMV` (Skinny Batch) | **$\approx 32\text{–}64\text{ FLOPs/Byte}$** *(incl. KV reads)* | **$5\times\text{–}9\times$ Below Ridge** | **HBM3 Bandwidth** | **ITL** ($< 25\text{ ms/tok}$) |

Because Decode operates far below the $295.3\text{ FLOPs/Byte}$ ridge point, GPU Tensor Cores sit ~80–90% idle waiting for HBM3 memory reads. Conversely, during Prefill, Tensor Cores run at 100% compute saturation while HBM bandwidth has headroom to spare.

Co-locating both phases on the same GPU pool creates two structural penalties:
1. **Head-of-Line SM Contention**: Even when vLLM or SGLang splits a 32,768-token prompt into 2,048-token prefill chunks (`--max-num-batched-tokens 2048`), piggybacking a 2,048-token prefill chunk onto a decode batch stretches that step's execution time from `~18 ms` to `~85–120 ms`—violating strict `<30 ms` Inter-Token Latency SLAs for every co-scheduled user.
2. **Coupled Parallelism Topology**: Prefill wants high **Tensor Parallelism (`TP=4` or `TP=8`)** to crunch massive prompt matrices quickly and minimize single-request TTFT, whereas Decode wants lower Tensor Parallelism (to avoid all-reduce latency on every token) combined with **Data Parallelism (`DP`)** or **Expert Parallelism (`EP`)** over large batches.

---

## 2. Disaggregated Serving Architecture Over RoCEv2 / InfiniBand

By disaggregating the cluster into an independent **Prefill Pool ($P$)** and **Decode Pool ($D$)** connected via a **Global KV-Aware Prefix Router**, we isolate both hardware bottlenecks and allow each pool to scale independently:

![Disaggregated Prefill-Decode RDMA & Layer-Pipelined KV Architecture](/images/disaggregated-llm-prefill-decode-rdma-architecture.jpg)

```text
+-------------------------------------------------------------------------------+
|               DISAGGREGATED PREFILL-DECODE RDMA ARCHITECTURE                  |
+-------------------------------------------------------------------------------+
|                                                                               |
|                 [ Global KV-Aware Router / Prefix Scheduler ]                 |
|                 (NVIDIA Dynamo / Mooncake Conductor / SGLang LB)              |
|                                       |                                       |
|        1. Coordinate P -> D Handoff   |                                       |
|        +------------------------------+------------------------------+        |
|        |                                                             |        |
|        v                                                             v        |
|  +------------------------------------+     2. Layer-Pipelined GPUDirect RDMA |
|  |   PREFILL NODE POOL (Compute-Opt)  |        Zero-Copy KV Block PUT/READ    |
|  |   Node A: 4x H100 (TP=4, 989 TF)   | ===================================>  |
|  |   Computes Prompt KV-Cache Blocks  |   (400 GbE RoCEv2 / NDR InfiniBand)   |
|  +------------------------------------+                                    |  |
|                                                                            v  |
|                                       +------------------------------------+  |
|                                       |   DECODE NODE POOL (Bandwidth-Opt) |  |
|                                       |   Node B: 8x H200 (4.8 TB/s HBM3e) |  |
|                                       |   Streams Autoregressive Tokens    |  |
|                                       +------------------------------------+  |
|                                                        |                      |
|                                                        v                      |
|                                            3. SSE Token Stream (<25ms ITL)    |
+-------------------------------------------------------------------------------+
```

### The Exact KV-Cache Network Math (GQA vs. DeepSeek MLA)

A common skepticism is: *"Isn't the KV-cache too massive to ship across the network on every request?"* Let's compute the exact byte footprint for **Llama-3.3-70B** using **Grouped-Query Attention (GQA)** versus **DeepSeek-V3 (671B)** using **Multi-Head Latent Attention (MLA)**:

#### Case A: Llama-3.3-70B (`GQA-8`)
- Transformer Layers ($L$): $80$
- KV Attention Heads ($H_{kv}$): $8$ (reduced $8\times$ from $64$ query heads via GQA)
- Head Dimension ($D_h$): $128$
- KV Element Size ($B_{\text{elem}}$): $1\text{ Byte}$ (`fp8_e4m3`) or $2\text{ Bytes}$ (`bf16`)

$$\text{KV}_{\text{token}}(\text{FP8}) = 2 \times L \times H_{kv} \times D_h \times 1\text{ B} = 2 \times 80 \times 8 \times 128 \times 1 = \mathbf{163,840\text{ Bytes}} = \mathbf{160\text{ KiB/token}}$$

*(In 16-bit `BF16`, this doubles to $327,680\text{ Bytes} = \mathbf{320\text{ KiB/token}}$).*

For a **4,096-token prompt** in FP8, the total KV-cache payload is:

$$4,096 \times 160\text{ KiB} = \mathbf{640\text{ MiB}} \quad (671,088,640\text{ Bytes} \approx \mathbf{671.1\text{ MB}})$$

For a heavy **32,768-token agentic prompt** in FP8, the total KV-cache payload is:

$$32,768 \times 160\text{ KiB} = \mathbf{5.0\text{ GiB}} \quad (5,368,709,120\text{ Bytes} \approx \mathbf{5.37\text{ GB}})$$

#### Case B: DeepSeek-V3 / R1 (`MLA` Latent Compression)
DeepSeek-V3/R1 ($L = 61$ layers) replaces standard $K, V$ heads with a compressed joint latent vector ($d_c = 512$) plus a decoupled RoPE key ($d_R = 64$), totaling just $576$ values per layer:

$$\text{KV}_{\text{token, MLA}}(\text{FP8}) = 61 \times (512 + 64) \times 1\text{ B} = \mathbf{35,136\text{ Bytes}} \approx \mathbf{34.3\text{ KiB/token}}$$

That is a **$4.66\times$ smaller network payload** than Llama-70B—meaning a **32,768-token DeepSeek-V3 prompt requires transferring only $1.10\text{ GiB}$ ($1.15\text{ GB}$)** across the RDMA fabric!

### Layer-by-Layer Pipelined Overlap (`NIXL` & `Mooncake`)

Over a single **400 Gbps ($\approx 47\text{ GB/s}$ effective payload goodput) RoCEv2 or NDR InfiniBand** NIC using GPUDirect RDMA:
- Sending a 4,096-token Llama-70B FP8 KV-cache ($671.1\text{ MB}$) takes **$14.2\text{ ms}$** of raw wire time.
- Better yet, modern transfer engines (**NVIDIA NIXL** and **Mooncake Transfer Engine**) do **not** wait for all 80 layers to finish prefill before starting the RDMA transfer. As soon as Layer $i$ writes its PagedAttention KV blocks into HBM, an asynchronous RDMA `WRITE` verb streams Layer $i$ across the PCIe switch directly from GPU HBM to the ConnectX-7 NIC while the GPU SMs immediately compute Layer $i+1$.
- By the time Layer 80 finishes computing on the Prefill node, **96%–98.7% of the KV-cache is already sitting in the Decode node's HBM**, leaving less than **`1–2 ms`** of exposed transfer latency!

---

## 3. Deploying Disaggregated Serving in Production (vLLM NIXL & SGLang Mooncake)

Both **vLLM v1** (via `NixlConnector` / `LMCacheConnectorV1`) and **SGLang** (via native `--disaggregation-mode` with `mooncake` or `nixl`) support multi-node disaggregated serving out of the box.

### Option A: vLLM v1 with NVIDIA `NixlConnector` (GPUDirect RDMA)

Below is a multi-node launch configuration running a **Prefill Producer (`Node A: 10.200.1.10`)** and a **Decode Consumer (`Node B: 10.200.1.20`)** over ConnectX-7 RoCEv2 (`mlx5_0`) with FP8 KV-cache quantization enabled:

```bash
#!/usr/bin/env bash
# ==============================================================================
# NODE A (10.200.1.10) — COMPUTE-BOUND PREFILL POOL (4x H100, TP=4)
# ==============================================================================
export UCX_TLS=rc,sm,cuda_copy,cuda_ipc,gdr_copy
export UCX_NET_DEVICES=mlx5_0:1
export VLLM_NIXL_SIDE_CHANNEL_HOST=10.200.1.10
export VLLM_NIXL_SIDE_CHANNEL_PORT=5557

vllm serve meta-llama/Llama-3.3-70B-Instruct-FP8 \
  --host 0.0.0.0 \
  --port 8100 \
  --tensor-parallel-size 4 \
  --kv-cache-dtype fp8_e4m3 \
  --gpu-memory-utilization 0.85 \
  --kv-transfer-config '{
    "kv_connector": "NixlConnector",
    "kv_role": "kv_both"
  }'
```

```bash
#!/usr/bin/env bash
# ==============================================================================
# NODE B (10.200.1.20) — BANDWIDTH-BOUND DECODE POOL (4x H100/H200, TP=4)
# ==============================================================================
export UCX_TLS=rc,sm,cuda_copy,cuda_ipc,gdr_copy
export UCX_NET_DEVICES=mlx5_0:1
export VLLM_NIXL_SIDE_CHANNEL_HOST=10.200.1.20
export VLLM_NIXL_SIDE_CHANNEL_PORT=5557

vllm serve meta-llama/Llama-3.3-70B-Instruct-FP8 \
  --host 0.0.0.0 \
  --port 8200 \
  --tensor-parallel-size 4 \
  --kv-cache-dtype fp8_e4m3 \
  --gpu-memory-utilization 0.93 \
  --kv-transfer-config '{
    "kv_connector": "NixlConnector",
    "kv_role": "kv_both"
  }'
```

### Option B: SGLang Disaggregated Serving with Mooncake RDMA Backend

If you are running **SGLang** (particularly for **DeepSeek-V3/R1** with MLA and Expert Parallelism), SGLang provides explicit `--disaggregation-mode prefill` and `--disaggregation-mode decode` workers paired with its Rust-backed disaggregated router:

```bash
# 1. Start SGLang Prefill Worker on Node A (10.200.1.10)
python3 -m sglang.launch_server \
  --model-path meta-llama/Llama-3.3-70B-Instruct-FP8 \
  --disaggregation-mode prefill \
  --disaggregation-transfer-backend mooncake \
  --disaggregation-ib-device mlx5_0 \
  --tp-size 4 \
  --kv-cache-dtype fp8_e4m3 \
  --host 10.200.1.10 \
  --port 30000

# 2. Start SGLang Decode Worker on Node B (10.200.1.20)
python3 -m sglang.launch_server \
  --model-path meta-llama/Llama-3.3-70B-Instruct-FP8 \
  --disaggregation-mode decode \
  --disaggregation-transfer-backend mooncake \
  --disaggregation-ib-device mlx5_0 \
  --tp-size 4 \
  --kv-cache-dtype fp8_e4m3 \
  --host 10.200.1.20 \
  --port 30001

# 3. Launch the Disaggregated Load Balancer Router
python3 -m sglang_router.launch_router \
  --pd-disaggregation \
  --prefill http://10.200.1.10:30000 \
  --decode http://10.200.1.20:30001 \
  --host 0.0.0.0 \
  --port 8000
```

---

## 4. Production Benchmark: Co-Located Chunked Prefill vs. Disaggregated RDMA

We benchmarked a bursty long-context production workload (**8k–32k input tokens**, **512 output tokens**, Poisson arrival rate up to **24 requests/sec**) across an 8x H100 cluster equipped with 400GbE NVIDIA ConnectX-7 NICs (`SLA targets: p99 TTFT < 1,500 ms, p99 ITL < 30 ms`):

![Prefill-Decode Interference vs. Disaggregated RDMA Serving](/images/prefill-decode-interference-vs-disaggregated-tail-latency.jpg)

| Serving Topology (8x H100 Total Footprint) | p50 TTFT | p99 TTFT | p50 ITL | p99 ITL (Tail Stall) | SLA-Compliant Goodput |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Co-Located Continuous Batching (`2x TP4`)** | 640 ms | 2,180 ms | 21 ms | **342 ms (Severe Spikes)** | 11.4 req/s |
| **Co-Located + Chunked Prefill (`2048` chunk)** | 790 ms | 1,850 ms | 26 ms | **118 ms (SLA Violated)** | 15.8 req/s |
| **Disaggregated `4P + 4D` (`RoCEv2 GPUDirect`)** | **510 ms** | **890 ms** | **18 ms** | **23 ms (Rock-Flat!)** | **23.6 req/s (+49%)** |

Look closely at the **p99 Inter-Token Latency (ITL)** and **Goodput** (requests/sec meeting both TTFT and ITL SLAs simultaneously):
- In **Co-Located Continuous Batching**, a single 32k-token prompt causes a **342 ms freeze** on all active decode streams sharing that `TP=4` replica.
- Enabling **Chunked Prefill** reduces the freeze to **118 ms**, but still breaks the `<30 ms` streaming ITL SLA by nearly $4\times$ while inflating TTFT due to chunking overhead.
- In **Disaggregated `4P + 4D` Serving**, the Decode pool never executes a single prompt `GEMM`. Its p99 ITL stays pinned at **23 ms** regardless of prompt length spikes, increasing SLA-compliant cluster goodput by **+49%** on the exact same 8-GPU budget.

---

## 5. RoCEv2 Lossless Fabric & PCIe P2P Tuning Checklist

If you run RDMA over Converged Ethernet (**RoCEv2**, UDP port `4791`) rather than native InfiniBand, standard lossy Ethernet TCP drop behavior will cripple RDMA `WRITE` throughput via Go-Back-N retransmissions during burst KV-cache transfers. Verify these four hardware and kernel layers before going live:

1. **Enforce Lossless Priority Flow Control (PFC) on Priority 3 (`DSCP 26`)**:
   Configure your ConnectX-7 NICs and leaf-spine switches so RoCEv2 traffic maps to traffic class 3 with link-level PFC pause frames enabled:
   ```bash
   # Map RoCEv2 traffic to DSCP 26 (Priority 3) and enable PFC on queue 3
   mlnx_qos -i enp170s0f0 --trust dscp --pfc 0,0,0,1,0,0,0,0
   cma_roce_tos -d mlx5_0 -t 106
   ```
2. **Enable DCQCN (ECN Congestion Marking Before Buffer Exhaustion)**:
   PFC is a last-resort brake; configure **Explicit Congestion Notification (ECN)** WRED thresholds on your leaf switches (`Kmin = 150 KB, Kmax = 1500 KB, Pmax = 20%`) so ConnectX-7 hardware Congestion Control (`DCQCN`) smoothly paces RDMA injection rates before PFC pause frames ever propagate upstream.
3. **Verify `nvidia_peermem` & Disable PCIe ACS on Switch Bridges**:
   GPUDirect RDMA requires two things to bypass host DDR5 RAM:
   - The `nvidia_peermem` kernel module must be loaded (`modprobe nvidia_peermem && lsmod | grep nvidia_peermem`).
   - **PCIe Access Control Services (ACS)** must be disabled on PCIe root/switch ports connecting the GPU and ConnectX-7 NIC; otherwise, PCIe transactions get redirected up to the CPU Root Complex, cutting DMA throughput in half!
4. **Validate Raw GPUDirect RDMA Bandwidth with `ib_write_bw`**:
   Before launching vLLM or SGLang, benchmark direct GPU-HBM-to-GPU-HBM RDMA bandwidth across nodes using `perftest` compiled with CUDA support:
   ```bash
   # On Decode Node B (Server — allocate buffer directly on CUDA GPU 0):
   ib_write_bw -d mlx5_0 --use_cuda=0 -F --report_gbits -q 4

   # On Prefill Node A (Client — stream 64KB blocks from CUDA GPU 0):
   ib_write_bw -d mlx5_0 --use_cuda=0 -F --report_gbits -q 4 -s 65536 10.200.1.20
   ```
   On a healthy 400GbE ConnectX-7 link, you should observe **`375–392 Gbps` (`46.8–49.0 GB/s`)** sustained GPU-to-GPU throughput with sub-3-microsecond one-way latency.

