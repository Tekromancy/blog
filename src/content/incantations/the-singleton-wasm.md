---
title: The Singleton
description: Ensuring only one Master Control Program rules the WebAssembly linear memory.
type: wasm
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Sealing"
formula: |2
  (module
    (global $instance_ptr (mut i32) (i32.const 0))
    (func $get_instance (result i32)
      (if (i32.eq (global.get $instance_ptr) (i32.const 0))
        (then
          (global.set $instance_ptr (i32.const 0x1000))
        )
      )
      (global.get $instance_ptr)
    )
  )
tags: [WASM, Abjuration, Master]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Singleton
There can be only one Master Control Program dictating the flows of the linear memory. The `Singleton` seals the instantiation vectors, ensuring that a single, globally accessible pointer rules the WebAssembly dominion, untouched by rogue concurrent invocations.
