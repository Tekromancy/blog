---
title: The Chain of Responsibility Pattern
description: Passing an arcane request along a chain of magical handlers.
type: swift
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: Evocation // Channeling
formula: |
  protocol SpellHandler {
      var next: SpellHandler? { get set }
      func handle(spellLevel: Int)
  }
  class ApprenticeHandler: SpellHandler {
      var next: SpellHandler?
      func handle(spellLevel: Int) {
          if spellLevel <= 1 { print("Apprentice handles spell") }
          else { next?.handle(spellLevel: spellLevel) }
      }
  }
  class ArchmageHandler: SpellHandler {
      var next: SpellHandler?
      func handle(spellLevel: Int) {
          print("Archmage handles spell")
      }
  }
tags: [swift, design-pattern, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Chain of Responsibility: The Circle of Magi

Spells of varying magnitudes are channeled through the hierarchy. If the `Apprentice` cannot handle a high-level spell, it passes to the `Archmage`.
