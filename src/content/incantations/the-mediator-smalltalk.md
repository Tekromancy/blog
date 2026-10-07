---
title: "Mediator: Smalltalk"
description: "Centralize the chaotic interactions of multiple chaotic spirits through a master seance table."
type: smalltalk
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Mediumship"
formula: |2
  Object subclass: #SeanceTableMediator
    instanceVariableNames: 'spirits'
    classVariableNames: ''
    package: 'Tekromancy-Seance'.

  SeanceTableMediator >> notify: aSpirit event: anEvent [
      anEvent = #Angry ifTrue: [ self calmAllOthers ].
      anEvent = #Departing ifTrue: [ self closePortal ].
  ]
tags: [smalltalk, behavioral, seance]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Instead of phantoms haunting each other, they speak only to the Table, which orchestrates the resonance.
