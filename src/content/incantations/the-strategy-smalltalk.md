---
title: "Strategy: Smalltalk"
description: "Swap out the summoning chant algorithm dynamically without disrupting the main ritual."
type: smalltalk
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: Divination // Ritual Selection
formula: |
  Object subclass: #SummoningRitual
    instanceVariableNames: 'chantStrategy'
    classVariableNames: ''
    package: 'Tekromancy-Seance'.
  
  SummoningRitual >> perform [
      chantStrategy executeChant.
      Transcript show: 'The portal opens!'.
  ]
tags: [smalltalk, behavioral, seance]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Will you use the Enochian Chant, or the Blood Sacrifice? The context simply executes the chosen strategy.
