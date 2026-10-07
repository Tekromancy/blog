---
title: "The Prime Mover: Thread-Safe Metaclass Singleton in Python"
description: "A bulletproof, thread-safe implementation of the Gang of Four Singleton pattern in Python using a custom Metaclass and double-checked locking—guaranteeing singular object instantiation across concurrent worker threads."
type: "python"
gofPattern: "Singleton Pattern (Creational)"
gofCategory: "Creational"
arcaneSchool: "Thaumaturgy // The Prime Mover Metaclass"
formula: |2
  import threading

  class SingletonMeta(type):
      _instances = {}
      _lock = threading.Lock()
      def __call__(cls, *args, **kwargs):
          if cls not in cls._instances:
              with cls._lock:
                  if cls not in cls._instances:
                      cls._instances[cls] = super().__call__(*args, **kwargs)
          return cls._instances[cls]

  class ArcaneDatabase(metaclass=SingletonMeta):
      def __init__(self, uri="sqlite:///:memory:"):
          self.uri = uri
tags: ["python", "python3", "singleton", "metaclass", "concurrency", "thread-safety", "gof-patterns", "thaumaturgy"]
pubDate: "2026-10-06"
author: "Joshua Edward McLaughlin Cox"
difficulty: "Adept"
draft: false
---

## The Lineage to the Gang of Four Singleton

In 1994, the Gang of Four defined the **Singleton Pattern**:
> *"Ensure a class only has one instance, and provide a global point of access to it."*
> — Design Patterns, p. 127

In Python, developers often attempt to implement Singletons by overriding `__new__`:
```python
# ⚠️ THE FLAWED __new__ SINGLETON
class FlawedSingleton:
    _instance = None
    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super().__new__(cls)
        return cls._instance
    def __init__(self, count):
        self.count = count # BUG: __init__ runs on EVERY call, overwriting state!
```
This naive approach suffers from two severe defects:
1. **Re-initialization Hazard**: Python invokes `__init__` *every single time* `FlawedSingleton()` is called, even when `__new__` returns the existing cached instance.
2. **Race Condition Hazard**: In multi-threaded environments, two threads checking `if not cls._instance:` simultaneously will instantiate two distinct objects.

By ascending to the level of the **Metaclass** (`type`), we intercept object creation in `__call__` *before* `__new__` and `__init__` are invoked, combined with **double-checked locking** for optimal concurrency.

---

## The Complete Python Script

```python
#!/usr/bin/env python3
"""
PATTERN: Singleton Pattern (Gang of Four Creational)
ARCANUM: Thaumaturgy // The Prime Mover Metaclass
DESCRIPTION: Thread-safe, non-reinitializing Singleton via Metaclass __call__.
"""
import threading
import time
from typing import Any, Dict


class SingletonMeta(type):
    """
    The Metaclass is the class of a class.
    By overriding __call__, we control what happens when a class is instantiated.
    """
    _instances: Dict[Any, Any] = {}
    _lock: threading.Lock = threading.Lock()

    def __call__(cls, *args, **kwargs) -> Any:
        # First check (without lock overhead for fast-path reads)
        if cls not in cls._instances:
            with cls._lock:
                # Second check (inside lock to prevent race conditions)
                if cls not in cls._instances:
                    instance = super().__call__(*args, **kwargs)
                    cls._instances[cls] = instance
        return cls._instances[cls]


class ArcaneDatabaseConnection(metaclass=SingletonMeta):
    """A singleton database connection pool."""
    
    def __init__(self, connection_string: str = "sqlite:///vault.db") -> None:
        # This __init__ block runs EXACTLY ONCE across the lifetime of the process!
        print(f"[THAUMATURGY INCEPTION] Initializing connection to: {connection_string}")
        self.connection_string = connection_string
        self.created_at = time.time()
        self.query_count = 0

    def execute(self, query: str) -> str:
        self.query_count += 1
        return f"[EXEC #{self.query_count}] {query} on {self.connection_string}"


def test_concurrent_instantiation():
    """Verify that 10 concurrent threads receive the exact same memory instance."""
    instances = []

    def worker(thread_id: int):
        time.sleep(0.01)  # Induce thread interleaving
        db = ArcaneDatabaseConnection(f"sqlite:///vault_{thread_id}.db")
        instances.append(db)

    threads = [threading.Thread(target=worker, args=(i,)) for i in range(10)]
    for t in threads:
        t.start()
    for t in threads:
        t.join()

    # Assert that all 10 threads obtained the exact same object reference
    first = instances[0]
    all_identical = all(inst is first for inst in instances)
    
    print("\n--- VERIFICATION TELEMETRY ---")
    print(f"Total Threads Spawned:   {len(instances)}")
    print(f"Unique Memory Addresses: {len(set(id(x) for x in instances))}")
    print(f"Initial Connection URI:  {first.connection_string}")
    print(f"Singleton Invariant:     {'PASS (100% Identity)' if all_identical else 'FAIL'}")
    print(first.execute("SELECT * FROM grimoire_secrets"))


if __name__ == "__main__":
    test_concurrent_instantiation()
```

---

## Why Metaclass Singleton Wins

```
Call: ArcaneDatabaseConnection("...")
                │
                ▼
      SingletonMeta.__call__
                │
                ▼
       Is cls in _instances?
       ├── YES ──▶ Return existing instance (Zero lock overhead, __init__ skipped!)
       │
       └── NO  ──▶ Acquire threading.Lock()
                     │
                     ▼
             Is cls still not in _instances?
             ├── YES ──▶ super().__call__() -> __new__() -> __init__()
             │           Save to _instances[cls]
             │
             └── NO  ──▶ Return existing instance
```

1. **Zero Repeated `__init__` Calls**: Since `super().__call__` is only executed when the instance is created, initialized attributes are never wiped out by subsequent calls.
2. **Double-Checked Locking**: Once the Singleton is instantiated, 99.99% of subsequent accesses bypass the mutex lock entirely, preserving multi-core throughput.
3. **Inheritance Cleanliness**: Any class can inherit the Singleton property simply by specifying `metaclass=SingletonMeta`.
