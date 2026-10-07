---
title: "Command: Smalltalk"
description: "Encapsulate a ritual command as an object to be executed, undone, or delayed."
type: smalltalk
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Compulsion"
formula: |2
  Object subclass: #BanishCommand
    instanceVariableNames: 'targetSpirit'
    classVariableNames: ''
    package: 'Tekromancy-Seance'.

  BanishCommand >> execute [ targetSpirit forceReturnToVoid ]
  BanishCommand >> undo [ targetSpirit resummon ]
tags: [smalltalk, behavioral, seance]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
A compulsion charm cast upon the aether. It can be held, invoked, or reversed at will.
