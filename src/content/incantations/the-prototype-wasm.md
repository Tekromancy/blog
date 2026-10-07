---
title: The Prototype
description: Cloning an existing homunculus from linear memory to avoid the costly ritual of conception.
type: wasm
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Conjuration // Biomancy"
formula: |2
  (module
    (memory 1)
    (func $clone_entity (param $src i32) (param $dst i32) (param $len i32)
      (memory.copy (local.get $dst) (local.get $src) (local.get $len))
    )
  )
tags: [WASM, Cloning, Biomancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Prototype
True conception is costly in linear memory. Why weave new flesh when one can simply perform a byte-for-byte duplication? The `Prototype` pattern clones an existing, fully-formed homunculus, manifesting a perfect mirror image through raw `memory.copy` incantations.
