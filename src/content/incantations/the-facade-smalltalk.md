---
title: "Facade: Smalltalk"
description: "Provide a simple Ouija interface to the complex spiritual subsystems beneath."
type: smalltalk
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // Ouija Board"
formula: |2
  Object subclass: #OuijaBoard
    instanceVariableNames: 'ritual portal protection'
    classVariableNames: ''
    package: 'Tekromancy-Seance'.

  OuijaBoard >> ask: aQuestion [
      protection wardArea.
      portal open.
      ^ portal transmit: aQuestion.
  ]
tags: [smalltalk, structural, seance]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The sitter only sees the planchette move; they do not see the complex ritual required to open the rift safely.
