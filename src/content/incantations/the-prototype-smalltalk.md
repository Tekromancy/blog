---
title: "Prototype: Smalltalk"
description: "Clone existing phantom objects rather than summoning new ones from scratch."
type: smalltalk
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Phantom Cloning"
formula: |2
  Object subclass: #Phantom
    instanceVariableNames: 'ectoplasm signature'
    classVariableNames: ''
    package: 'Tekromancy-Seance'.

  Phantom >> clone [
      | copy |
      copy := super copy.
      copy resetSignature.
      ^ copy
  ]
tags: [smalltalk, creational, seance]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Why disturb the void anew when you can simply fracture an existing spirit into a perfect duplicate?
