---
title: The Visitor Pattern
description: Representing an operation to be performed on the elements of an object structure.
type: swift
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Inspection"
formula: |2
  protocol MagicalElement {
      func accept(visitor: MagicInspector)
  }
  protocol MagicInspector {
      func visit(rune: RuneStone)
      func visit(scroll: MagicScroll)
  }
  class RuneStone: MagicalElement {
      func accept(visitor: MagicInspector) { visitor.visit(rune: self) }
  }
  class MagicScroll: MagicalElement {
      func accept(visitor: MagicInspector) { visitor.visit(scroll: self) }
  }
  class AuraScanner: MagicInspector {
      func visit(rune: RuneStone) { print("Scanning RuneStone aura") }
      func visit(scroll: MagicScroll) { print("Scanning MagicScroll aura") }
  }
tags: [swift, design-pattern, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

# The Visitor: The Aura Scanner

The Visitor pattern separates the `AuraScanner` algorithm from the magical artifacts (`RuneStone`, `MagicScroll`) it operates on, keeping the arcane classes pure.
