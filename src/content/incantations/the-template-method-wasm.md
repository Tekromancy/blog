---
title: The Template Method
description: A rigid skeletal invocation that allows derived spirits to flesh out the missing somatic components.
type: wasm
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Evocation // Invocation"
formula: |2
  (module
    (type $step (func))
    (table 2 funcref)

    (func $ritual_template (param $custom_step_idx i32)
      (call $prepare_circle)
      (call_indirect (type $step) (local.get $custom_step_idx))
      (call $seal_circle)
    )

    (func $prepare_circle)
    (func $seal_circle)
  )
tags: [WASM, Template, Evocation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Template Method
Certain summoning rituals require a strict, unyielding skeletal structure. The `Template Method` defines this rigid sequence, allowing derived spirits to flesh out only the specific, missing somatic components via table indirection.
