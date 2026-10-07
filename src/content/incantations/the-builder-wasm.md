---
title: The Builder
description: Constructing a Homunculus byte by byte, layering muscle over ethereal bone.
type: wasm
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Conjuration // Artifice"
formula: |2
  (module
    (memory $homunculus_body 1)
    (func $build_skeleton (param $offset i32)
      (i32.store (local.get $offset) (i32.const 0xB0NE)))
    (func $build_flesh (param $offset i32)
      (i32.store (i32.add (local.get $offset) (i32.const 4)) (i32.const 0xF1E5H)))
    (func $build_homunculus (result i32)
      (call $build_skeleton (i32.const 0))
      (call $build_flesh (i32.const 0))
      i32.const 0)
  )
tags: [WASM, Builder, Artifice]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Builder
A homunculus is not summoned in a single, volatile explosion of WebAssembly bytecode; it is constructed layer upon layer. The `Builder` pattern separates the grand architecture of synthetic life from its low-level memory store operations, allowing the same construction ritual to manifest varied aberrations.
