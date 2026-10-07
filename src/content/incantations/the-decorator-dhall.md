---
title: Decorator in Dhall
description: Dynamically augment the power of a rune via record merging.
type: dhall
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Enchantment // Augmentation"
formula: |2
  let Rune = { power : Natural, description : Text }
  
  let baseRune : Rune = { power = 10, description = "Basic Halt" }
  
  let empower =
        \(r : Rune) ->
          r // { power = r.power * 2, description = "Empowered " ++ r.description }
  
  in  empower baseRune
tags: [dhall, halting, runes, configuration, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

In the functional realms of Dhall, the **Decorator** pattern maps seamlessly to pure function application and record manipulation. An archmage passes a base spell into a decorator function, which safely overwrites specific fields with enhanced values, retaining the original type signature and preserving the total functional purity.
