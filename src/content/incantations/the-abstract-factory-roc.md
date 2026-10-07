---
title: The Abstract Factory of Wards
description: Conjuring families of related protective enchantments using functional records.
type: roc
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Wardmancy"
tags: [fast-functional-wards, roc, creation, factories]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
formula: |2
  interface WardFactory
      exposes [Factory, createFireWard, createIceWard, wardFactory]
      imports []

  Ward : [FireWard Str, IceWard Str]

  Factory : {
      createOffensiveWard : Str -> Ward,
      createDefensiveWard : Str -> Ward,
  }

  wardFactory : Factory
  wardFactory = {
      createOffensiveWard: \power -> FireWard "Burning strikes of ${power}",
      createDefensiveWard: \shield -> IceWard "Glacial barrier of ${shield}",
  }
---
