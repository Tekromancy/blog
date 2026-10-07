---
title: The Strategy
description: Swapping out the combat algorithms of a synthetic construct at runtime using table indirection.
type: wasm
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Battlemind"
formula: |2
  (module
    (type $combat_strategy (func (param i32 i32) (result i32)))
    (table 2 funcref)
    (elem (i32.const 0) $aggressive_stance $defensive_stance)

    (func $aggressive_stance (param $atk i32) (param $def i32) (result i32)
      (i32.mul (local.get $atk) (i32.const 2)))

    (func $defensive_stance (param $atk i32) (param $def i32) (result i32)
      (i32.mul (local.get $def) (i32.const 2)))

    (func $execute_strategy (param $strat_idx i32) (param $atk i32) (param $def i32) (result i32)
      (call_indirect (type $combat_strategy) (local.get $atk) (local.get $def) (local.get $strat_idx))
    )
  )
tags: [WASM, Strategy, Combat]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Strategy
Combat within the browser engine requires adaptability. The `Strategy` pattern utilizes table indirection to swap out the homunculus's offensive algorithms on the fly, seamlessly switching between aggressive and defensive stances.
