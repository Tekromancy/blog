---
title: "Proxy: Smalltalk"
description: "Control access to a dangerous demon using a warded proxy spirit."
type: smalltalk
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Spirit Ward"
formula: |2
  Object subclass: #WardedProxy
    instanceVariableNames: 'trueDemon isWarded'
    classVariableNames: ''
    package: 'Tekromancy-Seance'.

  WardedProxy >> commune: aMessage [
      isWarded ifFalse: [ ^ self error: 'Ward broken! The demon attacks!' ].
      ^ trueDemon commune: aMessage
  ]
tags: [smalltalk, structural, seance]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Never invoke the ancient ones directly. Always use a warded proxy to filter their corrosive messages.
