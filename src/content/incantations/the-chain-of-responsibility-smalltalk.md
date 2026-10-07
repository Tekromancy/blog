---
title: "Chain of Responsibility: Smalltalk"
description: "Pass a plea through a circle of mediums until one has the power to answer it."
type: smalltalk
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Evocation // Seance Circle"
formula: |2
  Object subclass: #MediumCircle
    instanceVariableNames: 'nextMedium powerLevel'
    classVariableNames: ''
    package: 'Tekromancy-Seance'.

  MediumCircle >> handleRequest: aRequest [
      aRequest intensity <= powerLevel
          ifTrue: [ self process: aRequest ]
          ifFalse: [ nextMedium ifNotNil: [ nextMedium handleRequest: aRequest ] ]
  ]
tags: [smalltalk, behavioral, seance]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The incantation is whispered from medium to medium until the proper resonance is met.
