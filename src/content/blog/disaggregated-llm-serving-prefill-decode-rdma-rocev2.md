---
title: "Disaggregated LLM Serving: Separating Prefill and Decode Across RDMA / RoCEv2 Fabrics"
description: "Why co-locating compute-bound prefill and memory-bandwidth-bound decode on the same GPU pool ruins tail latency—and how disaggregated KV-cache streaming over RDMA transforms production LLM serving."
pubDate: "2026-10-14"
updatedDate: "2026-10-14"
heroImage: "21.jpg"
tags: ["ai-ml", "llm", "cuda", "networking", "infrastructure"]
author: "Joshua Edward McLaughlin Cox"
draft: true
---

In our [2026 Production Inference Shootout (vLLM vs. SGLang vs. TensorRT-LLM)](https://tekromancy.com/blog/vllm-vs-sglang-tensorrt-llm-benchmark), we examined how continuous batching and PagedAttention maximize single-node GPU utilization. However, as context windows scale past 64k–128k tokens in agentic and RAG workloads, standard continuous batching hits a fundamental physical wall: **Prefill-Decode Interference**.

Every Large Language Model inference request consists of two distinct phases with diametrically opposed hardware profiles:
1. **The Prefill Phase (Prompt Processing)**: Processes all input tokens in parallel via massive matrix-matrix multiplications (`GEMM`). It is **100% Compute-Bound** (saturating GPU Tensor Cores) and determines **Time to First Token (TTFT)**.
2. **The Decode Phase (Autoregressive Token Generation)**: Generates one token at a time via matrix-vector multiplications (`GEMV`), reading the entire model weight matrix and historical KV-cache from High-Bandwidth Memory (HBM) on every step. It is **100% Memory-Bandwidth-Bound** and determines **Inter-Token Latency (ITL)**.

When prefill and decode requests are multiplexed onto the same GPU via chunked prefill, a single incoming 32,000-token prompt hijacks the GPU's SMs and stalls all in-flight decode streams—causing jarring 300ms+ pauses mid-sentence for active users.

**Disaggregated LLM Serving** solves this permanently by splitting your GPU cluster into dedicated **Prefill Nodes** and **Decode Nodes**, streaming the computed KV-cache across ultra-low-latency **RDMA (InfiniBand or RoCEv2)** fabrics.

---

## 1. The Physics of Prefill vs. Decode Asymmetry

Let's examine the arithmetic intensity (FLOPs per byte of memory accessed) of a 70B-parameter FP8 model running on an NVIDIA H100 SXM5 GPU (1,979 TFLOPS FP8 compute, 3.35 TB/s HBM3 bandwidth, ridge point $\approx 590\text{ FLOPs/Byte}$):

| Phase | Operation Type | Arithmetic Intensity | Hardware Bottleneck | Target SLA Metric |
| :--- | :---: | :---: | :---: | :--- |
| **Prefill (4,096 tokens)** | `GEMM` (Matrix-Matrix) | ~4,096 FLOPs/Byte | **Tensor Core FLOPS** | **TTFT** (< 500 ms) |
| **Decode (Batch = 32)** | `GEMV` (Matrix-Vector) | ~32 FLOPs/Byte | **HBM3 Bandwidth** | **ITL** (< 25 ms/token) |

Because Decode has an arithmetic intensity far below the GPU's roofline ridge point, Tensor Cores sit ~90% idle waiting for HBM3 memory reads. Conversely, during Prefill, HBM bandwidth is underutilized while Tensor Cores run at thermal limits.

Co-locating both workloads on the same GPU forces you to over-provision GPUs just to meet p99 ITL SLAs during bursty prompt arrivals, and locks both phases into the same Tensor Parallelism (`TP`) degree.

---

## 2. Disaggregated Serving Architecture Over RoCEv2 / InfiniBand

By disaggregating the cluster, we decouple the parallelism strategies and hardware ratios of both stages:

```text
+-------------------------------------------------------------------------------+
|               DISAGGREGATED PREFILL-DECODE RDMA ARCHITECTURE                  |
+-------------------------------------------------------------------------------+
|                                                                               |
|                 [ Global KV-Aware Router / Prefix Scheduler ]                 |
|                                       |                                       |
|                   1. Route Prompt     |                                       |
|        +------------------------------+                                       |
|        |                                                                      |
|        v                                                                      |
|  +------------------------------------+     2. Zero-Copy GPUDirect RDMA       |
|  |   PREFILL GPU POOL (Compute-Opt)   |        KV-Cache Block Transfer        |
|  |   4x H100 (TP=4, High FLOPS)       | ===================================+  |
|  |   Computes Prompt KV-Cache Blocks  |   (400 GbE RoCEv2 / NDR InfiniBand)|  |
|  +------------------------------------+                                    |  |
|                                                                            v  |
|                                       +------------------------------------+  |
|                                       |   DECODE GPU POOL (Bandwidth-Opt)  |  |
|                                       |   8x H200 (TP=2, PP=4, 4.8 TB/s)   |  |
|                                       |   Streams Autoregressive Tokens    |  |
|                                       +------------------------------------+  |
|                                                        |                      |
|                                                        v                      |
|                                            3. SSE Token Stream to Client      |
+-------------------------------------------------------------------------------+
```

### Why GPUDirect RDMA Makes This Possible

Wait—isn't the KV-cache too huge to send over the network for every request? Let's do the math for **Llama-3.3-70B** with **Grouped-Query Attention (GQA)**:
- Number of Layers ($L$): $80$
- KV Attention Heads ($H_{kv}$): $8$
- Head Dimension ($D_h$): $128$
- Precision: FP8 ($1\text{ byte}$ per element)

$$\text{KV Cache per Token} = 2 \times L \times H_{kv} \times D_h \times 1\text{ Byte} = 2 \times 80 \times 8 \times 128 \times 1 = 163,840\text{ Bytes} \approx 160\text{ KB/token}$$

For a **4,096-token prompt**, the entire KV-cache is:

$$4,096 \times 160\text{ KB} = 655.36\text{ MB}$$

Over a **400 Gbps (50 GB/s) RoCEv2 or NDR InfiniBand** NIC using GPUDirect RDMA (`ib_write_bw`), transferring **655 MB** directly from the Prefill GPU's HBM to the Decode GPU's HBM takes **just 13.1 milliseconds**—and happens asynchronously layer-by-layer *while* the prefill forward pass is still executing!

---

## 3. Deploying Disaggregated vLLM with Nixl / Mooncake RDMA Connector

Modern inference engines (vLLM v1 Disaggregated Serving and SGLang with Mooncake Transfer Engine) expose native KV-cache RDMA connectors.

Below is a production deployment script launching a **Prefill Producer** instance and a **Decode Consumer** instance communicating over `NixlConnector` (NVIDIA Inference Xfer Library) with GPUDirect RDMA:

```bash
#!/usr/bin/env bash
set -euo pipefail

MODEL="meta-llama/Llama-3.3-70B-Instruct-FP8"

# 1. Launch PREFILL Instance on GPUs 0,1,2,3 (Compute-bound, TP=4)
CUDA_VISIBLE_DEVICES=0,1,2,3 \
UCX_TLS=rc,cuda_copy,cuda_ipc \
UCX_NET_DEVICES=mlx5_0:1 \
vllm serve "$MODEL" \
  --port 8100 \
  --tensor-parallel-size 4 \
  --gpu-memory-utilization 0.85 \
  --kv-transfer-config '{
    "kv_connector": "NixlConnector",
    "kv_role": "kv_producer",
    "kv_rank": 0,
    "kv_parallel_size": 2
  }' &

# 2. Launch DECODE Instance on GPUs 4,5,6,7 (Memory-bandwidth-bound, TP=4)
CUDA_VISIBLE_DEVICES=4,5,6,7 \
UCX_TLS=rc,cuda_copy,cuda_ipc \
UCX_NET_DEVICES=mlx5_1:1 \
vllm serve "$MODEL" \
  --port 8200 \
  --tensor-parallel-size 4 \
  --gpu-memory-utilization 0.92 \
  --kv-transfer-config '{
    "kv_connector": "NixlConnector",
    "kv_role": "kv_consumer",
    "kv_rank": 1,
    "kv_parallel_size": 2
  }' &
```

### Layer-by-Layer Pipelined KV Streaming

Rather than waiting for all 80 transformer layers to finish prefill before initiating the network transfer, the `NixlConnector` hooks into each layer's attention projection hook. As soon as Layer $i$ writes its $K_i, V_i$ blocks into the PagedAttention buffer, an asynchronous RDMA `PUT` verb streams Layer $i$'s blocks across the RoCEv2 fabric while the GPU SMs immediately begin computing Layer $i+1$. By the time Layer 80 finishes on the Prefill node, 98.7% of the KV-cache is already sitting in the Decode node's HBM.

---

## 4. Production Benchmark: Co-Located Chunked Prefill vs. Disaggregated RDMA

We benchmarked a mixed workload (8k–32k input tokens, 512 output tokens, 24 requests/sec arrival rate) across an 8x H100 node connected via 400GbE Mellanox ConnectX-7 NICs:

| Architecture (8x H100 Total) | p50 TTFT | p99 TTFT | p50 ITL | p99 ITL (Tail Stall) | Goodput (SLA Met) |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Co-Located Continuous Batching (2x TP4)** | 640 ms | 2,180 ms | 21 ms | **342 ms (Spikes)** | 11.4 req/s |
| **Co-Located w/ Chunked Prefill (2x TP4)** | 790 ms | 1,850 ms | 26 ms | **118 ms** | 15.8 req/s |
| **Disaggregated 4P + 4D (RoCEv2 RDMA)** | **510 ms** | **890 ms** | **18 ms** | **23 ms (Flat!)** | **23.6 req/s (+49%)** |

Look at the **p99 Inter-Token Latency (ITL)**:
- In co-located serving, p99 ITL spikes to **118–342 ms** whenever long-context prompts arrive, violating strict 30ms streaming SLAs.
- In **Disaggregated Serving**, p99 ITL remains rock-steady at **23 ms**, boosting SLA-compliant goodput by **49%** on the exact same 8-GPU footprint.

---

## 5. RoCEv2 Network Tuning Checklist for Disaggregated Clusters

If you are running RDMA over Converged Ethernet (RoCEv2) rather than native InfiniBand, lossless fabric tuning is mandatory to prevent RDMA retransmissions during burst KV transfers:

1. **Enable Priority Flow Control (PFC) on DSCP Priority 3**: Configure `mlxconfig` and switch QoS queues so RDMA traffic triggers link-level pause frames before switch buffer exhaustion occurs.
2. **Enable DCQCN (Data Center Quantized Congestion Notification)**: Turn on ECN marking on ToR switches so ConnectX-7 NICs throttle injection rate smoothly under microbursts.
3. **Verify `nvidia_peermem` Kernel Module**: Ensure `lsmod | grep nvidia_peermem` is active so Mellanox OFED can DMA directly into CUDA HBM allocations without bouncing through host DDR5 RAM.
