---
title: "Memento: Smalltalk"
description: "Capture the exact soul state of an entity to restore it after a disastrous possession."
type: smalltalk
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: Chronomancy // Memory Echo
formula: |
  Object subclass: #PastLifeMemento
    instanceVariableNames: 'memories alignment'
    classVariableNames: ''
    package: 'Tekromancy-Seance'.
  
  Object subclass: #PossessedHost
    instanceVariableNames: 'memories alignment'
    classVariableNames: ''
    package: 'Tekromancy-Seance'.
    
  PossessedHost >> saveState [ ^ PastLifeMemento newWith: memories align: alignment ]
  PossessedHost >> restore: aMemento [
      memories := aMemento memories.
      alignment := aMemento alignment.
  ]
tags: [smalltalk, behavioral, seance]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Preserve the delicate threads of consciousness so they may be rewritten when the ritual goes awry.
