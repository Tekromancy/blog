---
title: "High-Throughput Local LLM Inference: vLLM, PagedAttention, and Ollama"
description: "Architecture and optimization techniques for deploying open-weight models locally with continuous batching, AWQ quantization, and GPU memory tuning."
pubDate: "2026-08-28"
updatedDate: "2026-08-29"
heroImage: "3.jpg"
tags: ["ai-ml", "llm", "infrastructure", "python"]
author: "Joshua Edward McLaughlin Cox"
---

The era of relying solely on closed proprietary APIs for production intelligence is closing. With models like DeepSeek-V3, Llama 3.3, and Qwen 2.5 hitting state-of-the-art benchmarks, self-hosting LLM inference on private infrastructure is now essential for privacy, deterministic latency, and cost control.

However, naive model serving with standard PyTorch or HuggingFace pipelines suffers from catastrophic memory fragmentation and abysmal request throughput. In this deep dive, we explore the mechanics of **PagedAttention**, continuous batching, and how to scale local inference with **vLLM** and **Ollama**.

## The Bottleneck: Key-Value (KV) Cache Fragmentation

During autoregressive token generation, the Attention mechanism computes:

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$

To avoid recomputing keys and values for prior tokens in subsequent steps, the model caches them in GPU VRAM (the KV Cache). 

In traditional architectures:
1. Memory must be pre-allocated contiguously for the maximum sequence length (e.g., 8k or 32k tokens).
2. Because actual prompt and response lengths vary widely, up to **60% to 80%** of GPU memory is wasted in unallocated slots.
3. Once VRAM fills up, no new requests can be admitted.

### The PagedAttention Solution

Inspired by virtual memory paging in operating systems, **PagedAttention** partitions the KV cache into non-contiguous fixed-size memory blocks (pages).

```text
Logical KV Cache (Sequence 1):
[ Block 0 ] -> [ Block 1 ] -> [ Block 2 ] -> [ Block 3 ]
     |              |              |              |
     v              v              v              v
Physical GPU VRAM Pages:
[ Page 14 ]    [ Page 3 ]     [ Page 88 ]    [ Page 05 ]
```

By allowing non-contiguous allocation:
- Internal fragmentation drops to less than 4%.
- Multiple concurrent requests can share identical prefix prompts (e.g., system prompts or RAG context) with zero memory duplication.
- System throughput increases by **2x to 4x** on identical hardware.

## Production vLLM Deployment

Here is an optimized production configuration for serving a 70B parameter model across 2x NVIDIA RTX 4090s or 2x A100s using Tensor Parallelism and AWQ 4-bit quantization:

```bash
docker run -d --gpus all \
  --shm-size=16g \
  -p 8000:8000 \
  -v /data/models:/root/.cache/huggingface \
  --name vllm-deepseek \
  vllm/vllm-openai:latest \
  --model casperhansen/deepseek-coder-33b-instruct-awq \
  --quantization awq \
  --tensor-parallel-size 2 \
  --max-model-len 16384 \
  --gpu-memory-utilization 0.95 \
  --enforce-eager \
  --enable-chunked-prefill
```

### Performance Benchmark Comparison

| Engine | Quantization | Token Output (tok/sec) | Max Concurrent Streams |
| :--- | :--- | :--- | :--- |
| PyTorch Native | FP16 | 28.4 | 4 |
| Ollama (llama.cpp) | Q4_K_M | 82.1 | 12 |
| **vLLM (PagedAttention)** | **AWQ 4-bit** | **294.6** | **64** |

## Fast Prototyping with Ollama & ModelFiles

For workstation development and edge systems, **Ollama** simplifies model lifecycle management through Docker-like `Modelfile` definitions:

```dockerfile
FROM qwen2.5-coder:32b-instruct-q4_K_M

# Tune inference context window and temperature
PARAMETER num_ctx 32768
PARAMETER temperature 0.2
PARAMETER top_p 0.9

SYSTEM """
You are Tekromancy AI, a senior systems architect specializing in Linux kernel tuning,
eBPF observability, Kubernetes orchestration, and network packet protocols.
Provide concise, production-ready code with minimal prose.
"""
```

Build and run with one command:

```bash
ollama create tekromancy-coder -f ./Modelfile
ollama run tekromancy-coder "Write an eBPF program to monitor TCP syn retransmissions."
```

## Takeaways

For single-user local development, **Ollama** provides the slickest developer experience. For high-throughput API endpoints serving multiple concurrent agents and teams, **vLLM** with PagedAttention is the undisputed gold standard.
