---
title: "Decorator: Smalltalk"
description: "Dynamically wrap spirits in layered auras to augment their manifestations."
type: smalltalk
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Aura Enhancement"
formula: |2
  Object subclass: #AuraDecorator
    instanceVariableNames: 'spirit'
    classVariableNames: ''
    package: 'Tekromancy-Seance'.

  AuraDecorator >> on: aSpirit [ spirit := aSpirit ]

  AuraDecorator >> manifest [
      spirit manifest.
      Transcript show: '...accompanied by a chilling wind!'.
  ]
tags: [smalltalk, structural, seance]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Add behaviors to your phantoms dynamically by wrapping them in layers of enchanting decorators.
