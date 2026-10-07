---
title: The Iterator of the Ley Lines
description: Sequentially accessing nodes in a magical ley line network.
type: fstar
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Ley Lines"
formula: |2
  module Iterator
  
  type node = { mana: nat }
  type ley_line = list node
  
  let has_next (l: ley_line) : bool =
    match l with | [] -> false | _ -> true
    
  let next (l: ley_line{has_next l}) : node * ley_line =
    match l with
    | h :: t -> (h, t)
tags: [iterator, traversal, sequences]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

A verified iterator that guarantees via refinement types that `next` can only be called if there are still magical nodes remaining.
