---
title: "Adapter: Smalltalk"
description: "Translate the alien whispers of ancient spirits into a protocol the modern seance table understands."
type: smalltalk
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: Transmutation // Spirit Channeling
formula: |
  Object subclass: #OuijaAdapter
    instanceVariableNames: 'ancientSpirit'
    classVariableNames: ''
    package: 'Tekromancy-Seance'.
  
  OuijaAdapter >> answerQuestion: aString [
      | alienResponse |
      alienResponse := ancientSpirit kharGath: aString.
      ^ self translateToEnglish: alienResponse
  ]
tags: [smalltalk, structural, seance]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Bridge the gap between incompatible spectral interfaces. The medium translates.
