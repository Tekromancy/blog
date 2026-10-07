---
title: "Iterator: Smalltalk"
description: "Traverse the myriad planes of the ethereal void without exposing its internal structure."
type: smalltalk
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Spirit Scrying"
formula: |2
  Object subclass: #EtherealIterator
    instanceVariableNames: 'planes currentIndex'
    classVariableNames: ''
    package: 'Tekromancy-Seance'.

  EtherealIterator >> hasNext [ ^ currentIndex <= planes size ]
  EtherealIterator >> next [
      | plane |
      plane := planes at: currentIndex.
      currentIndex := currentIndex + 1.
      ^ plane
  ]
tags: [smalltalk, behavioral, seance]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Scry through the infinite layers of the void sequentially.
