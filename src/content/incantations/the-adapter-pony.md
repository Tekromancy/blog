---
title: The Adapter Ward
description: Harmonizing disparate arcane interfaces.
type: pony
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Interface Shifting"
formula: |2
  class val LightningAdapter is EnergySource
    let _crystal: ManaCrystal val
    new create(c: ManaCrystal val) => _crystal = c
    fun draw_energy(): U32 => _crystal.extract_mana() * 2
tags: [pony, adapter]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

## The Adapter Ward

Adapters transmute incompatible method calls. Wrappers can safely embed `val` or `iso` capabilities to bridge the gaps between disparate magical subsystems.
