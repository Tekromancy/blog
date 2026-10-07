---
title: "The Iterator"
description: "Traversing the infinite dimensions of an arcane array without knowing its bounds."
type: j
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Dimensional Traversal"
formula: |2
  NB. In J, iteration is usually implicit via rank (" or S:)
  
  matrix =: 3 3 $ 1 2 3 4 5 6 7 8 9
  
  NB. Iterate over rows (rank 1)
  process_row =: 3 : '''Row sum: '' , ": +/ y'
  
  NB. The rank conjunction (") acts as the iterator
  iterate =: process_row"1
  
  NB. Usage: iterate matrix
tags: [iterator, rank, implicit, dimensions]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Implicit iteration through rank (`"`) is the idiomatic J equivalent of the Iterator pattern.
