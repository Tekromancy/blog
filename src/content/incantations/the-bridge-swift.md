---
title: The Bridge Pattern
description: Decoupling a magical abstraction from its elemental implementation.
type: swift
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Elementalism"
formula: |2
  protocol Element {
      func manifest() -> String
  }
  class FireElement: Element {
      func manifest() -> String { return "Fire" }
  }
  class Spell {
      var element: Element
      init(element: Element) { self.element = element }
      func cast() -> String { return "Casting \(element.manifest()) spell" }
  }
tags: [swift, design-pattern, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Bridge: Elemental Decoupling

The Bridge pattern allows the essence of a `Spell` to vary independently from its underlying `Element`.
