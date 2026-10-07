---
title: The Iterator
description: Traversing boundless magical dimensions lazily.
type: ocaml
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: Divination // Dimension Traversal
formula: |
  type 'a seq = Cons of 'a * (unit -> 'a seq) | Nil
  
  let rec infinite_mana n = Cons (n, fun () -> infinite_mana (n + 10))
  
  let rec take n seq =
    if n = 0 then []
    else match seq with
    | Nil -> []
    | Cons (x, next) -> x :: take (n - 1) (next ())
    
  let mana_crystals = take 3 (infinite_mana 10)
tags: [Caml Metamagic, Lazy Sequences, OCaml]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The Iterator is realized via lazy sequences. We can iterate over boundless magical dimensions without exhausting the material plane's memory.
