---
title: The State
description: Morphing the homunculus's behavior intrinsically as its elemental alignment shifts.
type: wasm
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Metamorphosis"
formula: |2
  (module
    (type $behavior (func (result i32)))
    (table 2 funcref)
    (elem (i32.const 0) $solid_state $liquid_state)
    (global $current_state (mut i32) (i32.const 0))

    (func $solid_state (result i32) (i32.const 0x5011D))
    (func $liquid_state (result i32) (i32.const 0x11QU1D))

    (func $act (result i32)
      (call_indirect (type $behavior) (global.get $current_state))
    )
  )
tags: [WASM, State, Metamorphosis]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The State
As the elemental alignment of the homunculus shifts, so too must its behavior. The `State` pattern alters the entity's intrinsic responses dynamically, morphing its combat and survival algorithms as it transitions between solid and liquid forms.
