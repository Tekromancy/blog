---
title: "The Adapter: Arcane Translation Matrix"
description: "Bridging ancient runic interfaces with modern cyber-magical protocols."
type: idris
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Protocol-Shifting"
formula: |2
  module Adapter
  
  -- The target interface
  interface CyberProtocol p where
    transmitData : p -> String -> String
  
  -- The ancient, incompatible system
  record AncientRune where
    constructor MkAncientRune
    runePower : Nat
  
  castRune : AncientRune -> String -> String
  castRune _ msg = "Rune inscribed: " ++ msg
  
  -- The Adapter
  data RuneAdapter = MkRuneAdapter AncientRune
  
  CyberProtocol RuneAdapter where
    transmitData (MkRuneAdapter r) msg = castRune r msg
tags: [structural, interfaces, type-classes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Adapter serves as a hermetic translation matrix, allowing the archaic `AncientRune` to interface seamlessly with the hyper-modern `CyberProtocol`. Within the Theorem Proving Pacts, the Adapter does not just convert types; it mathematically aligns the semantics of disparate arcane systems, ensuring that mana and data flow without dimensional leakage.
