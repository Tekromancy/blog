---
title: "Bridge: Smalltalk"
description: "Decouple the spiritual manifestation from the physical medium conveying it."
type: smalltalk
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: Abjuration // Planar Bridging
formula: |
  Object subclass: #PlanarManifestation
    instanceVariableNames: 'medium'
    classVariableNames: ''
    package: 'Tekromancy-Seance'.
  
  PlanarManifestation >> medium: aMedium [ medium := aMedium ]
  
  PlanarManifestation >> expressAnger [
      medium shakeTable.
      medium dropTemperature.
  ]
tags: [smalltalk, structural, seance]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The spirit decides the emotion, the bridge delegates the physical phenomena to the connected medium.
