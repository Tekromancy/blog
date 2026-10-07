---
title: The Decorator Pattern
description: Dynamically attaching new magical properties to objects.
type: swift
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Enhancement"
formula: |2
  protocol Wand {
      func power() -> Int
  }
  class BasicWand: Wand {
      func power() -> Int { return 10 }
  }
  class GemEnchantment: Wand {
      private let baseWand: Wand
      init(baseWand: Wand) { self.baseWand = baseWand }
      func power() -> Int { return baseWand.power() + 5 }
  }
tags: [swift, design-pattern, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Decorator: Enhancing the Wand

The Decorator allows us to augment a `BasicWand` with a `GemEnchantment` without altering the original wand's internal essence.
