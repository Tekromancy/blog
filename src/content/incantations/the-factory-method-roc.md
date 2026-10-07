---
title: The Factory Method of Summons
description: Delegating the precise nature of an arcane manifestation to dynamic constructors.
type: roc
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Summoning"
tags: [fast-functional-wards, roc, factory]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
formula: |2
  interface SummonFactory
      exposes [Spirit, summonSpirit]
      imports []

  Spirit : [FireElemental, WaterUndine, EarthGolem]

  summonSpirit : [Fire, Water, Earth] -> Spirit
  summonSpirit = \element ->
      when element is
          Fire -> FireElemental
          Water -> WaterUndine
          Earth -> EarthGolem
---
