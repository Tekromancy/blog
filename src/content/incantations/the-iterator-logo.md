---
title: "Iterator: Transversing the Ley Nodes"
description: "Navigate a Lisp-like list of mystical nodes without exposing its underlying traversal mechanics to the pathfinding logic."
type: logo
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Transmutation // Traversal"
formula: |2
  make "ley-nodes [[10 10] [50 50] [-20 80] [0 0]]

  to create-iterator :lst
    output :lst
  end

  to has-next? :iter
    output not empty? :iter
  end

  to next-node :iter-name
    localmake "val first thing :iter-name
    make :iter-name bf thing :iter-name
    output :val
  end

  ; Algorithmic Pathfinding via Iterator
  make "my-iter create-iterator :ley-nodes
  pu
  while [has-next? :my-iter] [
    setpos next-node "my-iter
    pd arc 360 5 pu
  ]
tags: [turtle-divination, Lisp-like]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
