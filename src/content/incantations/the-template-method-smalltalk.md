---
title: "Template Method: Smalltalk"
description: "Define the skeletal steps of a seance, letting subclasses override specific incantations."
type: smalltalk
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: Evocation // Seance Scripting
formula: |
  Object subclass: #BaseSeance
    instanceVariableNames: ''
    classVariableNames: ''
    package: 'Tekromancy-Seance'.
  
  BaseSeance >> conductSeance [
      self dimLights.
      self invokeSpirit.
      self closePortal.
  ]
  
  BaseSeance >> invokeSpirit [ self subclassResponsibility ]
tags: [smalltalk, behavioral, seance]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The absolute unyielding flow of the ritual is preserved in the base class, while subclasses fill in the blanks.
