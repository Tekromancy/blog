---
title: Flyweight in Dhall
description: Share fundamental rune glyphs across configurations to minimize evaluation footprint.
type: dhall
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Condensation"
formula: |2
  let RuneGlyph = { shape : Text, color : Text }
  
  -- The Flyweight cache
  let Cache =
        { fire = { shape = "Triangle", color = "Red" }
        , water = { shape = "Wave", color = "Blue" }
        }
  
  let drawFire = Cache.fire
  let drawWater = Cache.water
  
  in  [ drawFire, drawFire, drawWater ]
tags: [dhall, halting, runes, configuration, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The **Flyweight** pattern prevents explosive code duplication within the halting matrix of Dhall. By binding heavily re-used record structures to common `let` expressions, memory and text footprint are minimized. When the file is fully resolved, the references securely duplicate out as needed, proving an elegant optimization technique for massive spell configurations.
