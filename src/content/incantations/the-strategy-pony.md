---
title: The Strategy Ward
description: Selecting battle tactics dynamically.
type: pony
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Tactical Foresight"
formula: |2
  trait val CombatStrategy
    fun execute_move(): String val

  class val FlankStrategy is CombatStrategy
    fun execute_move(): String val => "Flank the enemy!"
tags: [pony, strategy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

## The Strategy Ward

Tactics passed as `val` traits allow warriors to safely swap strategies at runtime without corrupting battle plans.
