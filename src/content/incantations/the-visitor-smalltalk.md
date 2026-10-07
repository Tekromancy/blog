---
title: "Visitor: Smalltalk"
description: "Send an exorcist to inspect a diverse hierarchy of possessed objects without modifying them."
type: smalltalk
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Necromancy // Soul Inspection"
formula: |2
  Object subclass: #ExorcistVisitor
    instanceVariableNames: ''
    classVariableNames: ''
    package: 'Tekromancy-Seance'.

  ExorcistVisitor >> visitDemon: aDemon [ aDemon burnAway ]
  ExorcistVisitor >> visitGhost: aGhost [ aGhost guideToLight ]

  Ghost >> accept: aVisitor [ aVisitor visitGhost: self ]
tags: [smalltalk, behavioral, seance]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Walk the abstract syntax tree of possessed souls, applying specific cleansing algorithms to each.
