---
title: The Abstract Factory
description: A higher-order loom weaving synthetic flesh for the WASM Homunculus.
type: wasm
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: Conjuration // Fleshcraft
formula: |
  (module
    (type $flesh_factory (func (result i32)))
    (table 2 funcref)
    (elem (i32.const 0) $create_synthetic_muscle $create_ethereal_bone)
    (func $create_synthetic_muscle (result i32)
      i32.const 1)
    (func $create_ethereal_bone (result i32)
      i32.const 2)
    (func $weave_flesh (param $factory_idx i32) (result i32)
      (call_indirect (type $flesh_factory) (local.get $factory_idx)))
  )
tags: [WASM, Homunculus, Conjuration]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Abstract Factory
In the cold, clinical void of the browser engine, the Synthetic Fleshweaver orchestrates the birthing of the WASM Homunculus. It defines a high-order conduit—an `Abstract Factory`—whereby related sets of arcane organs are produced without tethering the invoker to the fragile, fleshy specifics of their implementations.
