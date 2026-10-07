---
title: Adapter in Dhall
description: Translate legacy scrolls into modern, type-safe formulas.
type: dhall
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Translation"
formula: |2
  let OldScroll = { incantation : Text }
  let NewSpell = { formula : Text }
  
  let castSpell = \(s : NewSpell) -> s.formula
  
  let scrollAdapter = \(s : OldScroll) -> { formula = s.incantation }
  
  let old = { incantation = "Halt execution!" }
  
  in  castSpell (scrollAdapter old)
tags: [dhall, halting, runes, configuration, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The **Adapter** pattern in Dhall acts as a syntactic bridge between differing structural schemas. When ancient, untyped incantations (or outdated record schemas) must be fed into the modern halting mechanisms, the Adapter function seamlessly maps the old keys into the new fields, ensuring smooth integration without runtime panics.
