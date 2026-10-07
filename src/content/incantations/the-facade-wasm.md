---
title: The Facade
description: A unified ritual interface masking the terrifying complexity of the browser's DOM manipulation layers.
type: wasm
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // Shadow Magic"
formula: |2
  (module
    (import "dom" "create" (func $create (param i32)))
    (import "dom" "append" (func $append (param i32 i32)))
    (func $spawn_ui_element
      (call $create (i32.const 1))
      (call $append (i32.const 0) (i32.const 1))
    )
  )
tags: [WASM, Facade, Illusion]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Facade
The true horror of the browser's DOM manipulation layers is enough to drive any magus mad. The `Facade` provides a single, unified ritual interface, masking the terrifying complexity behind a clean, simplified WASM abstraction boundary.
