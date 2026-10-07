---
title: "The Strategy"
description: "Swapping out different sorting algorithms for an array of captured souls."
type: j
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Tactical Weaving"
formula: |2
  NB. Strategies
  strat_asc =: /:~
  strat_desc =: \:~
  
  NB. Context uses an adverb to apply strategy
  sort_souls =: 1 : 0
    u y
  )
  
  souls =: 5 2 8 1 9
  
  NB. Usage:
  NB. strat_asc sort_souls souls
  NB. strat_desc sort_souls souls
tags: [strategy, adverbs, sorting, arrays]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Adverbs applying passed verbs act dynamically as interchangeable strategies.
