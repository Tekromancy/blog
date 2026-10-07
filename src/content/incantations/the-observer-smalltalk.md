---
title: "Observer: Smalltalk"
description: "Allow multiple cultists to passively watch the Ouija board for any ectoplasmic changes."
type: smalltalk
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: Divination // Ectoplasmic Resonance
formula: |
  Object subclass: #OuijaBoardSubject
    instanceVariableNames: 'observers currentLetter'
    classVariableNames: ''
    package: 'Tekromancy-Seance'.
  
  OuijaBoardSubject >> letter: aChar [
      currentLetter := aChar.
      self changed: #letterUpdate
  ]
tags: [smalltalk, behavioral, seance]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
In Smalltalk, the Observer pattern is woven deep into the fabric of Object via `changed:` and `update:`.
