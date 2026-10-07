---
title: The Decorator
description: Dynamically binding new cybernetic enhancements to the WASM stack frame at runtime.
type: wasm
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Augmentation"
formula: |2
  (module
    (func $base_attack (result i32)
      (i32.const 10)
    )
    (func $fire_augmented_attack (result i32)
      (i32.add (call $base_attack) (i32.const 5)) ;; Add fire damage
    )
  )
tags: [WASM, Decorator, Cybernetics]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Decorator
The base homunculus is often weak, requiring cybernetic augmentation to survive the harsh browser environment. The `Decorator` dynamically wraps the entity's base functions with flaming auras and adamantine plating, all without permanently mutating the core soul script.
