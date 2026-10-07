---
title: "Builder: Smalltalk"
description: "Assemble complex rituals step-by-step before invoking the final manifestation."
type: smalltalk
gofPattern: Builder
gofCategory: Creational
arcaneSchool: Transmutation // Construct Assembly
formula: |
  Object subclass: #RitualBuilder
    instanceVariableNames: 'candles chalk incantation'
    classVariableNames: ''
    package: 'Tekromancy-Seance'.
  
  RitualBuilder >> addCandles: anInteger [ candles := anInteger ]
  RitualBuilder >> drawSigil: aString [ chalk := aString ]
  RitualBuilder >> chant: aString [ incantation := aString ]
  RitualBuilder >> manifest [ ^ SummoningRitual newWith: candles sigil: chalk chant: incantation ]
tags: [smalltalk, creational, seance]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The medium gathers the arcane components one by one before the true invocation begins.
