---
title: "Singleton: Smalltalk"
description: "Ensure only one absolute Void exists from which all spirits are drawn."
type: smalltalk
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: Conjuration // Unique Familiar
formula: |
  Object subclass: #TheVoid
    instanceVariableNames: ''
    classVariableNames: 'UniqueInstance'
    package: 'Tekromancy-Seance'.
  
  TheVoid class >> uniqueInstance [
      UniqueInstance ifNil: [ UniqueInstance := self basicNew initialize ].
      ^ UniqueInstance
  ]
  
  TheVoid class >> new [
      self error: 'You cannot create another Void. Use #uniqueInstance'
  ]
tags: [smalltalk, creational, seance]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The absolute singularity. There is only one Void. To attempt to create another is folly.
