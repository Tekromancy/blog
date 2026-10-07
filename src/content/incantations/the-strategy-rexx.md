---
title: Tactical Sort Strategy
description: Choose dynamically between different sort utilities (DFSORT vs SYNCSORT).
type: rexx
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Tactical"
formula: |2
  /* ooRexx Strategy */
  ::class SortContext
  ::attribute strategy
  ::method executeSort
    use arg data
    return self~strategy~sort(data)

  ::class DFSORTStrategy
  ::method sort
    use arg data
    say "Sorting via DFSORT."
    return data

  ::class SYNCSORTStrategy
  ::method sort
    use arg data
    say "Sorting via SYNCSORT."
    return data
tags: [strategy, dfsort, rexx]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Depending on system resonance and licensing wards, the Strategy pattern seamlessly switches the underlying sort incantation without disrupting the main script.
