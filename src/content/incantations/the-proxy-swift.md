---
title: The Proxy Pattern
description: A magical surrogate controlling access to a powerful artifact.
type: swift
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Warding"
formula: |2
  protocol Grimoire {
      func readSpells()
  }
  class AncientGrimoire: Grimoire {
      func readSpells() { print("Reading forbidden spells") }
  }
  class GrimoireProxy: Grimoire {
      private lazy var realGrimoire = AncientGrimoire()
      private let isAuthorized: Bool
      init(isAuthorized: Bool) { self.isAuthorized = isAuthorized }
      func readSpells() {
          if isAuthorized { realGrimoire.readSpells() }
          else { print("Access denied by the magical ward") }
      }
  }
tags: [swift, design-pattern, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Proxy: The Guarded Grimoire

The Proxy pattern ensures that an `AncientGrimoire` is only instantiated and accessed by those with the proper arcane authorization.
