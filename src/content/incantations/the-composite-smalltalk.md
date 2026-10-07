---
title: "Composite: Smalltalk"
description: "Treat a singular poltergeist and a legion of spirits uniformly."
type: smalltalk
gofPattern: Composite
gofCategory: Structural
arcaneSchool: Illusion // Legion of Spirits
formula: |
  Object subclass: #SpiritLegion
    instanceVariableNames: 'entities'
    classVariableNames: ''
    package: 'Tekromancy-Seance'.
  
  SpiritLegion >> initialize [ entities := OrderedCollection new ]
  SpiritLegion >> add: aSpirit [ entities add: aSpirit ]
  SpiritLegion >> manifest [
      entities do: [ :each | each manifest ]
  ]
tags: [smalltalk, structural, seance]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
When the medium calls upon the Legion, the message cascades perfectly to all entities within the swarm.
