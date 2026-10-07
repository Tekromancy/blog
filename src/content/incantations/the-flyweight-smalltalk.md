---
title: "Flyweight: Smalltalk"
description: "Share ectoplasmic state efficiently to support vast numbers of weak poltergeists."
type: smalltalk
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Conjuration // Ectoplasm Pooling"
formula: |2
  Object subclass: #EctoplasmPool
    instanceVariableNames: 'sharedEssences'
    classVariableNames: ''
    package: 'Tekromancy-Seance'.

  EctoplasmPool >> essenceFor: emotionType [
      ^ sharedEssences at: emotionType ifAbsentPut: [ Ectoplasm newType: emotionType ]
  ]
tags: [smalltalk, structural, seance]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
When manifesting a thousand screaming souls, one must conserve memory by pooling shared spectral essence.
