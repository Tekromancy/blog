---
title: The Factory Method
description: Delegating the instantiation of volatile engine spirits to localized sub-routines.
type: wasm
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: Conjuration // Spirit Binding
formula: |
  (module
    (func $spawn_spirit (param $type i32) (result i32)
      (if (result i32) (i32.eq (local.get $type) (i32.const 1))
        (then (i32.const 0x5P1R1T))
        (else (i32.const 0xDEM0N))
      )
    )
  )
tags: [WASM, Binding, Spirits]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Factory Method
To bind volatile engine spirits to the WASM stack, one must delegate the ultimate decision of their form to subclasses. The `Factory Method` defines an interface for birthing these spirits, allowing localized sub-routines to alter the spirit's spectral signature at runtime.
