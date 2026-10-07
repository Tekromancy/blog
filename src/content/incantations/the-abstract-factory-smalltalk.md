---
title: "Abstract Factory: Smalltalk"
description: "Conjure families of related spirits without specifying their concrete spectral classes."
type: smalltalk
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: Conjuration // Ectoplasmic Forms
formula: |
  Object subclass: #SpiritFactory
    instanceVariableNames: ''
    classVariableNames: ''
    package: 'Tekromancy-Seance'.
  
  SpiritFactory class >> currentRealm: aSymbol [
      aSymbol = #Underworld ifTrue: [ ^ UnderworldFactory new ].
      aSymbol = #Ethereal ifTrue: [ ^ EtherealFactory new ].
      ^ nil
  ]
tags: [smalltalk, creational, seance]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
A seance where the medium does not dictate which spirit arrives, only the realm it comes from.
