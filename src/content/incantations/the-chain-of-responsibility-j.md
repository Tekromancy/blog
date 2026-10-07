---
title: "The Chain of Responsibility"
description: "Passing an anomaly through a sequence of warding glyphs until one absorbs it."
type: j
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Sequential Warding"
formula: |2
  handler1 =: 3 : 'if. y < 10 do. ''Handled by Ward 1'' else. _1 end.'
  handler2 =: 3 : 'if. y < 20 do. ''Handled by Ward 2'' else. _1 end.'
  handler3 =: 3 : '''Handled by Ward 3'''
  
  chain =: handler1 ` handler2 ` handler3
  
  NB. Agenda conjunction (@.) or explicit looping over gerunds
  process =: 3 : 0
    for_h. chain do.
      res =. (h@.) '' y
      if. res ~: _1 do. res return. end.
    end.
  )
tags: [chain, gerunds, control, abjuration]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

Using arrays of gerunds to form a functional chain of responsibility, attempting execution sequentially.
