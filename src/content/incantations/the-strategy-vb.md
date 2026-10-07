---
title: The Strategy of Sort Algorithms
description: Swappable rituals for processing arrays of variant data.
type: vb
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Tactics"
formula: |2
  ' ISortStrategy.cls
  Public Sub Sort(ByRef arr() As Variant)
  End Sub

  ' BubbleSortCurse.cls
  Implements ISortStrategy
  Private Sub ISortStrategy_Sort(ByRef arr() As Variant)
      ' The most inefficient and evil sort possible
  End Sub
tags: [strategy, sorting, variants]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
The Strategy pattern provides a way to inject different algorithms into a host context at runtime. In the dark ages, passing objects implementing `ISortStrategy` circumvented the lack of function pointers.
