---
title: The Bridge of Aspects
description: Decoupling spell effects from their delivery mechanisms using higher-order functions.
type: roc
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Evocation // Projection"
tags: [fast-functional-wards, roc, bridge]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
formula: |2
  interface AspectBridge
      exposes [DeliveryMethod, SpellEffect, castSpell]
      imports []

  DeliveryMethod : [Touch, Projectile, Aura]
  SpellEffect : [Burn, Freeze, Shock]

  # Bridge: The mechanism of delivery is separated from the effect.
  # We compose them dynamically.
  
  applyEffect : SpellEffect -> Str
  applyEffect = \effect ->
      when effect is
          Burn -> "inflicts burning damage"
          Freeze -> "solidifies the target in ice"
          Shock -> "electrocutes the surroundings"

  deliver : DeliveryMethod, Str -> Str
  deliver = \method, effectStr ->
      when method is
          Touch -> "By touch, the ward ${effectStr}"
          Projectile -> "A magical bolt flies and ${effectStr}"
          Aura -> "Radiating outward, the energy ${effectStr}"

  castSpell : DeliveryMethod, SpellEffect -> Str
  castSpell = \method, effect ->
      effectStr = applyEffect effect
      deliver method effectStr
---
