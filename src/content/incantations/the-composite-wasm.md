---
title: The Composite
description: Treating individual synthetic cells and entire limbs with the same stack manipulation syntax.
type: wasm
gofPattern: Composite
gofCategory: Structural
arcaneSchool: Transmutation // Golemancy
formula: |
  (module
    ;; Recursively walk a tree of cells in linear memory
    (func $activate_node (param $node_ptr i32)
      ;; Check if leaf or composite
      (if (i32.load8_u (local.get $node_ptr))
        (then
          ;; Activate child nodes
        )
        (else
          ;; Activate single cell
        )
      )
    )
  )
tags: [WASM, Composite, Golemancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Composite
Whether it is a single synthetic cell or a sprawling, multi-limbed monstrosity, the `Composite` pattern ensures they are treated uniformly. Through recursive stack manipulation, entire golems can be commanded as simply as a solitary byte.
