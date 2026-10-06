---
title: "The Runic Talisman: Python Descriptors as Strategy Validators"
description: "Harness Python's data descriptor protocol (__get__, __set__, __set_name__) to implement the Gang of Four Strategy pattern—binding reusable, declarative validation algorithms to class attributes cleanly."
type: "python"
gofPattern: "Strategy Pattern (Behavioral)"
gofCategory: "Behavioral"
arcaneSchool: "Enchantment // The Runic Validation Talisman"
formula: |
  class ValidatedField:
      def __init__(self, strategy):
          self.strategy = strategy
      def __set_name__(self, owner, name):
          self.private_name = f"_{name}"
      def __get__(self, obj, objtype=None):
          return getattr(obj, self.private_name, None)
      def __set__(self, obj, value):
          self.strategy.validate(value)
          setattr(obj, self.private_name, value)

  class ArchonRune:
      power_level = ValidatedField(RangeStrategy(1, 100))
      sigil_code  = ValidatedField(RegexStrategy(r"^[A-Z]{3}-\d{4}$"))
tags: ["python", "python3", "descriptors", "strategy-pattern", "validation", "data-integrity", "gof-patterns", "enchantment"]
pubDate: "2026-10-06"
author: "Joshua Edward McLaughlin Cox"
difficulty: "Adept"
draft: false
---

## The Lineage to the Gang of Four Strategy

In 1994, the Gang of Four defined the **Strategy Pattern**:
> *"Define a family of algorithms, encapsulate each one, and make them interchangeable. Strategy lets the algorithm vary independently from clients that use it."*
> — Design Patterns, p. 315

In Python object modeling, validation logic frequently pollutes domain entities:
```python
# ⚠️ THE BOILERPLATE SETTER ANTI-PATTERN
class SpellScroll:
    def __init__(self, power, code):
        if not (1 <= power <= 100):
            raise ValueError("Invalid power")
        self.power = power
        if not re.match(r"^[A-Z]{3}-\d{4}$", code):
            raise ValueError("Invalid code")
        self.code = code
```
If multiple entities across a codebase need identical validation (e.g., port numbers, UUIDs, ISO timestamps, memory bounds), engineers resort to copy-pasting conditionals or wrapping everything in verbose property decorators (`@property`, `@power.setter`).

By combining Python's **Descriptor Protocol** (`__set__`, `__get__`, `__set_name__`) with the **Strategy Pattern**, we extract validation rules into reusable algorithmic classes that can be bound declaratively to any model.

---

## The Complete Python Script

```python
#!/usr/bin/env python3
"""
PATTERN: Strategy Pattern via Python Descriptors (Gang of Four Behavioral)
ARCANUM: Enchantment // The Runic Validation Talisman
DESCRIPTION: Declarative, pluggable attribute validation strategies.
"""
import re
from abc import ABC, abstractmethod
from typing import Any


# ------------------------------------------------------------------------------
# 1. STRATEGY INTERFACES (FAMILY OF VALIDATION ALGORITHMS)
# ------------------------------------------------------------------------------

class ValidationStrategy(ABC):
    """Abstract Strategy defining the validation contract."""
    
    @abstractmethod
    def validate(self, field_name: str, value: Any) -> None:
        pass


class RangeStrategy(ValidationStrategy):
    """Strategy: Enforces numeric boundary constraints."""
    
    def __init__(self, min_val: float, max_val: float):
        self.min_val = min_val
        self.max_val = max_val

    def validate(self, field_name: str, value: Any) -> None:
        if not isinstance(value, (int, float)):
            raise TypeError(f"Field '{field_name}' must be numeric; got {type(value).__name__}")
        if not (self.min_val <= value <= self.max_val):
            raise ValueError(
                f"Field '{field_name}' value {value} out of bounds [{self.min_val}, {self.max_val}]"
            )


class RegexStrategy(ValidationStrategy):
    """Strategy: Enforces string pattern compliance."""
    
    def __init__(self, pattern: str, description: str = "valid regex pattern"):
        self.regex = re.compile(pattern)
        self.description = description

    def validate(self, field_name: str, value: Any) -> None:
        if not isinstance(value, str):
            raise TypeError(f"Field '{field_name}' must be a string; got {type(value).__name__}")
        if not self.regex.match(value):
            raise ValueError(
                f"Field '{field_name}' ('{value}') failed compliance: must match {self.description}"
            )


# ------------------------------------------------------------------------------
# 2. THE DESCRIPTOR CONTEXT (THE TALISMAN)
# ------------------------------------------------------------------------------

class ValidatedAttribute:
    """Python Descriptor that delegates attribute assignment to a Strategy."""
    
    def __init__(self, strategy: ValidationStrategy):
        self.strategy = strategy
        self.name = ""
        self.storage_name = ""

    def __set_name__(self, owner: Any, name: str) -> None:
        # Automatically capture the attribute variable name on class creation
        self.name = name
        self.storage_name = f"_talisman_{name}"

    def __get__(self, obj: Any, objtype: Any = None) -> Any:
        if obj is None:
            return self
        return getattr(obj, self.storage_name, None)

    def __set__(self, obj: Any, value: Any) -> None:
        # Delegate validation to the pluggable Strategy algorithm
        self.strategy.validate(self.name, value)
        setattr(obj, self.storage_name, value)


# ------------------------------------------------------------------------------
# 3. DOMAIN MODEL (DECLARATIVE ENCHANTMENT)
# ------------------------------------------------------------------------------

class ArcaneArtifact:
    # Declaratively bound validation strategies
    mana_cost = ValidatedAttribute(RangeStrategy(min_val=1, max_val=500))
    rune_sigil = ValidatedAttribute(RegexStrategy(r"^[A-Z]{3}-\d{4}$", "RUNIC-#### format"))

    def __init__(self, name: str, mana_cost: int, rune_sigil: str):
        self.name = name
        self.mana_cost = mana_cost
        self.rune_sigil = rune_sigil

    def __repr__(self) -> str:
        return f"<Artifact: {self.name} | Mana: {self.mana_cost} | Sigil: {self.rune_sigil}>"


def test_talisman_validation():
    print("[ENCHANTMENT] Binding Runic Validation Talisman...")
    
    # 1. Valid artifact instantiation
    valid_wand = ArcaneArtifact("Wand of the Archon", mana_cost=45, rune_sigil="ARC-1042")
    print(f"✓ Valid Creation: {valid_wand}")

    # 2. Attempting invalid range
    try:
        ArcaneArtifact("Forbidden Blade", mana_cost=9999, rune_sigil="BLD-9000")
    except ValueError as e:
        print(f"🛡️ Caught Illegal Mana: {e}")

    # 3. Attempting invalid regex
    try:
        ArcaneArtifact("Cursed Ring", mana_cost=50, rune_sigil="not-a-sigil")
    except ValueError as e:
        print(f"🛡️ Caught Illegal Sigil: {e}")


if __name__ == "__main__":
    test_talisman_validation()
```

---

## Architectural Breakdown

```
ArcaneArtifact Class
  ├── mana_cost   ──▶ ValidatedAttribute(RangeStrategy(1, 500))
  └── rune_sigil  ──▶ ValidatedAttribute(RegexStrategy(r"^[A-Z]{3}-\d{4}$"))
          │
          ▼
Assignment: artifact.mana_cost = 999
          │
          ▼
Descriptor __set__(obj, 999)
          │
          ▼
Strategy.validate("mana_cost", 999)
  ├── Out of bounds! ──▶ Raises ValueError
  └── Valid!          ──▶ Sets obj._talisman_mana_cost = 999
```
