---
title: The Chain of Responsibility
description: Passing aberrant psychic pulses through a sequence of protective wards until one contains it.
type: wasm
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Warding"
formula: |2
  (module
    (func $ward_tier_1 (param $pulse_level i32) (result i32)
      (if (result i32) (i32.le_u (local.get $pulse_level) (i32.const 10))
        (then (i32.const 1)) ;; Handled
        (else (call $ward_tier_2 (local.get $pulse_level)))
      )
    )
    (func $ward_tier_2 (param $pulse_level i32) (result i32)
      (i32.const 1) ;; Ultimate containment
    )
  )
tags: [WASM, Warding, Chain]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Chain of Responsibility
Aberrant psychic pulses often threaten to crash the runtime. The `Chain of Responsibility` passes these volatile anomalies through a sequence of protective wards, each deciding whether to contain the pulse or pass it deeper into the containment grid.
