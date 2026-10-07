---
title: "The Adapter Conduit"
description: "Bridging incompatible magical frequencies."
type: agda
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Energy Conversion"
formula: |2
  module AdapterPattern where
  
  open import Data.String
  
  record OldSpell : Set where
    field chant : String
    
  record NewSpell : Set where
    field invoke : String
    
  -- The Adapter
  adaptSpell : OldSpell → NewSpell
  adaptSpell old = record { invoke = OldSpell.chant old }
tags: ["agda", "structural", "adapter"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Adapter Conduit

When older, legacy megacorp artifacts must interface with newly spun open-source magic, an **Adapter Conduit** translates the spectral frequencies between them.

## The Dependent Runes

This pattern is a pure function transforming the structure of `OldSpell` to `NewSpell`. Agda’s rigid types ensure no spectral leakage occurs during adaptation.
