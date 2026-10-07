---
title: The Flyweight of Mana
description: Sharing intrinsic arcane state to minimize the memory footprint of massive ward arrays.
type: roc
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Efficiency"
tags: [fast-functional-wards, roc, flyweight]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
formula: |2
  interface ManaFlyweight
      exposes [IntrinsicState, ExtrinsicState, WardParticle, createParticle]
      imports []

  # Shared state (Flyweight)
  IntrinsicState : {
      color : Str,
      texture : Str
  }

  # Unique state
  ExtrinsicState : {
      x : F64,
      y : F64,
      velocity : F64
  }

  WardParticle : {
      shared : IntrinsicState,
      unique : ExtrinsicState
  }

  sharedFireMana : IntrinsicState
  sharedFireMana = { color: "Red", texture: "Flickering" }

  createParticle : ExtrinsicState -> WardParticle
  createParticle = \uniqueData ->
      { shared: sharedFireMana, unique: uniqueData }
---
