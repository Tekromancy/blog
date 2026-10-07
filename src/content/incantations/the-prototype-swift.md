---
title: The Prototype Pattern
description: Cloning existing magical entities to save arcane energy.
type: swift
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Cloning"
formula: |2
  protocol Clonable {
      func clone() -> Self
  }
  class MagicApple: Clonable {
      var color: String
      init(color: String) { self.color = color }
      func clone() -> Self {
          return type(of: self).init(color: self.color)
      }
  }
tags: [swift, design-pattern, creational]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Prototype: Mirroring the Apple

Instead of expending vast amounts of mana to conjure new apples from scratch, the Prototype pattern allows Swift casters to duplicate an existing `MagicApple`.
