---
title: "Factory Method: Smalltalk"
description: "Let subclasses decide which spectral entity to instantiate during the seance."
type: smalltalk
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Entity Invocation"
formula: |2
  Object subclass: #Medium
    instanceVariableNames: ''
    classVariableNames: ''
    package: 'Tekromancy-Seance'.

  Medium >> commune [
      | spirit |
      spirit := self summonSpirit.
      spirit receiveMessage: #speak.
  ]

  Medium >> summonSpirit [
      self subclassResponsibility
  ]
tags: [smalltalk, creational, seance]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The base ritual defines the communion, but the specific medium decides the summoned entity.
