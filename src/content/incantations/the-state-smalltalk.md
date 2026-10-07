---
title: "State: Smalltalk"
description: "Allow a phantom to completely alter its reactions based on its emotional state."
type: smalltalk
gofPattern: State
gofCategory: Behavioral
arcaneSchool: Transmutation // Phase Shifting
formula: |
  Object subclass: #PhantomEntity
    instanceVariableNames: 'emotionalState'
    classVariableNames: ''
    package: 'Tekromancy-Seance'.
  
  PhantomEntity >> interact [
      emotionalState interactWith: self
  ]
  
  PhantomEntity >> beVengeful [ emotionalState := VengefulState new ]
tags: [smalltalk, behavioral, seance]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
When a spirit shifts from Docile to Vengeful, it is as if the object changes its class entirely.
