---
title: The Memento
description: Capturing the volatile soul state of the engine into a linear memory snapshot.
type: wasm
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: Necromancy // Soul Trapping
formula: |
  (module
    (memory 1)
    (func $save_state (param $snapshot_ptr i32) (param $hp i32) (param $mana i32)
      (i32.store (local.get $snapshot_ptr) (local.get $hp))
      (i32.store (i32.add (local.get $snapshot_ptr) (i32.const 4)) (local.get $mana))
    )
    (func $restore_state (param $snapshot_ptr i32) (result i32 i32)
      (i32.load (local.get $snapshot_ptr))
      (i32.load (i32.add (local.get $snapshot_ptr) (i32.const 4)))
    )
  )
tags: [WASM, Memento, Necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Memento
Before a dangerous mutation is attempted, the soul's current state must be preserved. The `Memento` captures a perfect snapshot of the entity's vital metrics, allowing a complete restoration if the operation corrupts the primary stack.
