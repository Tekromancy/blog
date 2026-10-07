---
title: The Facade of Rituals
description: Providing a simple interface to a complex orchestration of magical subsystems.
type: roc
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Conjuration // Ritualism"
tags: [fast-functional-wards, roc, facade]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
formula: |2
  interface RitualFacade
      exposes [performRitual]
      imports []

  # Complex Subsystems
  igniteBrazier = \_ -> "Brazier ignited"
  drawPentagram = \_ -> "Pentagram drawn"
  chantIncantation = \words -> "Chanting: ${words}"

  # Facade
  performRitual : Str -> Str
  performRitual = \spellName ->
      step1 = igniteBrazier {}
      step2 = drawPentagram {}
      step3 = chantIncantation spellName
      "${step1}, ${step2}, ${step3}. The ritual is complete."
---
