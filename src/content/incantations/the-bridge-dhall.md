---
title: Bridge in Dhall
description: Decouple a runic abstraction from its visual implementation using higher-order evaluation.
type: dhall
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Evocation // Projection"
formula: |2
  let Color = < Red | Blue >
  let Shape = < Circle : Color | Square : Color >
  
  let renderColor = \(c : Color) ->
        merge { Red = "Blood Rune", Blue = "Mana Rune" } c
  
  let renderShape = \(s : Shape) ->
        merge
          { Circle = \(c : Color) -> "Round " ++ renderColor c
          , Square = \(c : Color) -> "Angular " ++ renderColor c
          }
          s
  
  in  renderShape (Shape.Circle Color.Blue)
tags: [dhall, halting, runes, configuration, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The **Bridge** pattern allows Dhall practitioners to vary their logical abstractions (Shapes) independently from their concrete manifestations (Colors). By employing nested unions and delegated `merge` blocks, the rendering logic is elegantly disjointed, proving that even in a configuration space, multi-dimensional complexity can be safely composed and guaranteed to halt.
