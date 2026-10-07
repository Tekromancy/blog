---
title: The Flyweight
description: Sharing intrinsic ethereal blueprints in linear memory to spawn thousands of micro-homunculi.
type: wasm
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: Conjuration // Swarm
formula: |
  (module
    (memory 1)
    ;; Intrinsic data stored once at 0x0
    ;; Extrinsic state passed via stack
    (func $render_micro_entity (param $x f32) (param $y f32)
      (local.get $x)
      (local.get $y)
      (i32.load (i32.const 0)) ;; Load shared model
    )
  )
tags: [WASM, Swarm, Optimization]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Flyweight
When a swarm of micro-homunculi is required to overrun the browser, allocating individual memories for each is a fool's errand. The `Flyweight` extracts the intrinsic blueprints, sharing them across thousands of entities to prevent catastrophic memory exhaustion.
