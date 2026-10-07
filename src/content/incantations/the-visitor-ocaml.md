---
title: The Visitor
description: Traversing a heterogeneous menagerie of magical beasts and applying diverse effects without mutating their essence.
type: ocaml
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Conjuration // Menagerie Traversal"
formula: |2
  type beast = Dragon | Griffin | Mimic

  let feed = function
    | Dragon -> "Fed molten rock."
    | Griffin -> "Fed raw meat."
    | Mimic -> "Fed a gold coin."

  let pet = function
    | Dragon -> "Burned hand."
    | Griffin -> "Purrs loudly."
    | Mimic -> "Lost hand."
tags: [Caml Metamagic, Pattern Matching, OCaml]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

In functional OCaml, the Visitor pattern is inherently solved by defining operations over an Algebraic Data Type via pattern matching, keeping the data structures pure and separated from their behaviors.
