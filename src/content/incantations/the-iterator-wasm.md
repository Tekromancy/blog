---
title: The Iterator
description: Sequentially traversing the neural pathways of the synthetic homunculus.
type: wasm
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Pathfinding"
formula: |2
  (module
    (global $current_node (mut i32) (i32.const 0))
    (func $next (result i32)
      (local $val i32)
      (local.set $val (i32.load (global.get $current_node)))
      (global.set $current_node (i32.add (global.get $current_node) (i32.const 4)))
      (local.get $val)
    )
  )
tags: [WASM, Iterator, Neural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Iterator
Traversing the neural pathways of a synthetic mind requires precision. The `Iterator` sequentially steps through the tangled web of linear memory nodes, exposing the homunculus's thoughts without revealing the underlying, chaotic structure.
