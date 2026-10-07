---
title: The Bridge
description: Decoupling the physical manifestation of the homunculus from its ethereal manipulation routines.
type: wasm
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: Transmutation // Symbiosis
formula: |
  (module
    (type $renderer (func (param i32)))
    (table 1 funcref)
    (elem (i32.const 0) $render_canvas)
    (func $render_canvas (param $data i32)
      ;; Canvas rendering logic
    )
    (func $manipulate_entity (param $entity i32) (param $renderer_idx i32)
      ;; Ethereal logic
      (call_indirect (type $renderer) (local.get $entity) (local.get $renderer_idx))
    )
  )
tags: [WASM, Symbiosis, Bridge]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Bridge
The soul of the homunculus and its physical canvas rendering must remain decoupled, lest the sheer complexity of their symbiosis tear the engine apart. The `Bridge` separates the ethereal manipulation logic from the gross, pixel-pushing physical manifestations.
