---
title: The Adapter of Arcane Interfaces
description: Translating incompatible magical protocols using functional wrappers.
type: roc
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Metamagic"
tags: [fast-functional-wards, roc, adapter]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
formula: |2
  interface ArcaneAdapter
      exposes [castOldSpell, newSpellAdapter]
      imports []

  # The old, incompatible magic interface
  OldSpell : {
      incantation : Str,
      powerLevel : U64
  }

  castOldSpell : OldSpell -> Str
  castOldSpell = \spell ->
      "Casting ${spell.incantation} at power ${Num.toStr spell.powerLevel}"

  # The new modern interface
  NewSpell : {
      formula : Str,
      intensity : F64
  }

  # The Adapter function
  newSpellAdapter : NewSpell -> OldSpell
  newSpellAdapter = \newSpell ->
      {
          incantation: newSpell.formula,
          powerLevel: Num.round (newSpell.intensity * 100.0)
      }
---
