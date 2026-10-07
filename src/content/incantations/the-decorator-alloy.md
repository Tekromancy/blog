---
title: "The Decorator: Layering the Arcane Wards"
description: "Attach additional responsibilities to an object dynamically."
type: alloy
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Abjuration // Ward-Layering"
formula: |2
  abstract sig Entity {
    power: lone Mana
  }
  
  sig BaseMage extends Entity {}
  
  abstract sig WardLayer extends Entity {
    target: one Entity
  }
  {
    power = target.power
  }
  
  sig ShieldWard, StealthWard extends WardLayer {}
  
  sig Mana {}
  
  fact "Wards Cannot Wrap Themselves" {
    no w: WardLayer | w in w.^target
  }
  
  pred shield_up[w: ShieldWard] {
    some w.power
  }
  
  run shield_up for 4
tags: [structural, decorator, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Decorator: Layering the Arcane Wards

By wrapping an `Entity` with a `WardLayer`, we seamlessly adopt its interface. Crucially, the decorator's `power` relation maps exactly to its `target`'s power. Much like the Composite, we must defensively declare that a Ward cannot infinitely wrap itself, lest the analysis engine tear a hole in space-time.
