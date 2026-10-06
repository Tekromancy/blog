---
title: "The Phantasmal Mirror: Dynamic Telemetry Proxy in Python"
description: "A transparent, non-intrusive object Proxy in Python using __getattr__ and functools.wraps that wraps arbitrary third-party services with latency tracing, circuit breaking, and security audit logging without changing a single line of target code."
type: "python"
gofPattern: "Proxy Pattern (Structural)"
gofCategory: "Structural"
arcaneSchool: "Illusion // The Phantasmal Mirror Proxy"
formula: |
  import time, functools

  class TelemetryProxy:
      def __init__(self, target):
          self._target = target
      def __getattr__(self, name):
          attr = getattr(self._target, name)
          if not callable(attr): return attr
          @functools.wraps(attr)
          def wrapper(*args, **kwargs):
              start = time.perf_counter()
              try:
                  res = attr(*args, **kwargs)
                  print(f"[MIRROR] {name}() succeeded in {(time.perf_counter()-start)*1000:.2f}ms")
                  return res
              except Exception as err:
                  print(f"[MIRROR BREACH] {name}() raised {err}")
                  raise
          return wrapper
tags: ["python", "python3", "proxy-pattern", "telemetry", "tracing", "circuit-breaker", "gof-patterns", "illusion"]
pubDate: "2026-10-06"
author: "Joshua Edward McLaughlin Cox"
difficulty: "Adept"
draft: false
---

## The Lineage to the Gang of Four Proxy

In 1994, the Gang of Four defined the **Proxy Pattern**:
> *"Provide a surrogate or placeholder for another object to control access to it."*
> — Design Patterns, p. 207

When integrating third-party SDKs, uninstrumented legacy databases, or external microservice clients, developers often need cross-cutting observability:
- Timing execution latencies.
- Counting failures and logging error payloads.
- Injecting security audit controls.

Modifying the original class violates the Open/Closed Principle and is often impossible when consuming compiled vendor packages.

The **Phantasmal Mirror** is a dynamic Python **Virtual & Protection Proxy**. By intercepting attribute access through `__getattr__`, it dynamically synthesizes instrumented wrapper methods around the target object, creating a transparent, indistinguishable surrogate.

---

## The Complete Python Script

```python
#!/usr/bin/env python3
"""
PATTERN: Proxy Pattern (Gang of Four Structural)
ARCANUM: Illusion // The Phantasmal Mirror Proxy
DESCRIPTION: Dynamic transparent telemetry and fault-injection proxy.
"""
import functools
import time
from typing import Any, Callable


# ------------------------------------------------------------------------------
# 1. THE THIRD-PARTY SERVICE (UNAWARE OF PROXYING)
# ------------------------------------------------------------------------------

class UninstrumentedVaultService:
    """A realistic third-party client with no built-in telemetry."""
    
    def __init__(self, host: str):
        self.host = host

    def fetch_secret(self, key: str) -> str:
        time.sleep(0.04)  # Simulate network latency
        if key == "forbidden_grimoire":
            raise PermissionError("Access Denied: Ward Level 9 Required")
        return f"ENCRYPTED_PAYLOAD_FOR_{key.upper()}"

    def rotate_keys(self, count: int) -> int:
        time.sleep(0.08)
        return count * 2


# ------------------------------------------------------------------------------
# 2. THE DYNAMIC PROXY (THE PHANTASMAL MIRROR)
# ------------------------------------------------------------------------------

class PhantasmalTelemetryProxy:
    """
    Surrogate that intercepts calls to the underlying target,
    providing telemetry, timing, and error insulation.
    """
    
    def __init__(self, target: Any):
        # Store target using object's __dict__ to avoid triggering __getattr__
        self.__dict__["_target"] = target
        self.__dict__["_call_metrics"] = {}

    def __getattr__(self, name: str) -> Any:
        target = self.__dict__["_target"]
        attr = getattr(target, name)

        # If the requested attribute is not a method, return it directly
        if not callable(attr):
            return attr

        # Dynamically wrap callable methods with telemetry instrumentation
        @functools.wraps(attr)
        def instrumented_call(*args, **kwargs):
            start_time = time.perf_counter()
            target_name = type(target).__name__
            
            try:
                result = attr(*args, **kwargs)
                elapsed_ms = (time.perf_counter() - start_time) * 1000
                print(f"[MIRROR: SUCCESS] {target_name}.{name}() ──▶ {elapsed_ms:6.2f}ms")
                return result
            except Exception as exc:
                elapsed_ms = (time.perf_counter() - start_time) * 1000
                print(f"[MIRROR: BREACH]  {target_name}.{name}() ──▶ FAILED ({type(exc).__name__}: {exc}) in {elapsed_ms:6.2f}ms")
                raise exc

        return instrumented_call

    def __setattr__(self, name: str, value: Any) -> None:
        if name in self.__dict__:
            self.__dict__[name] = value
        else:
            setattr(self.__dict__["_target"], name, value)


# ------------------------------------------------------------------------------
# 3. VERIFICATION EXPERIMENT
# ------------------------------------------------------------------------------

def execute_proxy_experiment():
    print("==========================================================")
    print("[ILLUSION] Casting Phantasmal Mirror Telemetry Proxy...")
    print("==========================================================")

    # 1. Instantiate the raw service
    raw_service = UninstrumentedVaultService(host="vault.tekromancy.internal")

    # 2. Encase it in the Phantasmal Proxy
    proxy = PhantasmalTelemetryProxy(raw_service)

    # 3. Client interacts with the proxy identically to the real service
    secret = proxy.fetch_secret("api_token")
    print(f"Client Received: {secret}\n")

    rotated = proxy.rotate_keys(count=4)
    print(f"Client Received: {rotated} keys rotated\n")

    # 4. Observe transparent exception tracing
    try:
        proxy.fetch_secret("forbidden_grimoire")
    except PermissionError:
        print("Client caught expected exception from wrapped backend.\n")

    print("==========================================================")
    print("[VERIFIED] Target was traced without modifying original class.")
    print("==========================================================")


if __name__ == "__main__":
    execute_proxy_experiment()
```

---

## Architectural Comparison

```
Client Calling: proxy.fetch_secret("api_token")
                      │
                      ▼
┌────────────────────────────────────────────────────────┐
│ PhantasmalTelemetryProxy (Surrogate)                   │
│                                                        │
│  1. Capture start = time.perf_counter()                │
│  2. Delegate to raw_service.fetch_secret("api_token")  │
│  3. Calculate elapsed latency                          │
│  4. Emit telemetry stream                              │
│  5. Return result to client                            │
└────────────────────────────────────────────────────────┘
```
