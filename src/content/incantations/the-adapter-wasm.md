---
title: The Adapter
description: Translating arcane browser incantations into native WASM logic pulses.
type: wasm
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Polymorph"
formula: |2
  (module
    (import "env" "legacy_cast" (func $legacy_cast (param i32)))
    (func $modern_cast (param $spell_id f64)
      (call $legacy_cast (i32.trunc_f64_s (local.get $spell_id)))
    )
  )
tags: [WASM, Transmutation, Adapter]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Adapter
The legacy browsers whisper in archaic, forgotten tongues. The `Adapter` wraps these ancient DOM incantations, translating their discordant frequencies into pure, typed WASM logic pulses that the homunculus can consume without shattering its internal stack.
