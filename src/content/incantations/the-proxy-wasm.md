---
title: The Proxy
description: A guardian sentinel controlling access to the forbidden sectors of the WASM linear memory.
type: wasm
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Warding"
formula: |2
  (module
    (memory 1)
    (func $secure_read (param $addr i32) (result i32)
      (if (i32.lt_u (local.get $addr) (i32.const 1024))
        (then (unreachable)) ;; Access denied to protected sector
      )
      (i32.load (local.get $addr))
    )
  )
tags: [WASM, Proxy, Warding]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Proxy
Forbidden sectors of the WASM linear memory must be protected. The `Proxy` acts as a sentinel, intercepting all read and write requests, validating the caller's arcane credentials before allowing access to the engine's most volatile secrets.
