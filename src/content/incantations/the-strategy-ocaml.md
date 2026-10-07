---
title: The Strategy
description: Hot-swapping combat incantations dynamically during arcane duels.
type: ocaml
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Dynamic Tactics"
formula: |2
  type strategy = int -> int -> int

  let aggressive_tactic x y = x * y
  let defensive_tactic x y = x + y

  let execute_tactic strat x y = strat x y

  let power = execute_tactic aggressive_tactic 10 5
tags: [Caml Metamagic, First-Class Functions, OCaml]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Passing functions as first-class values provides the ultimate Strategy pattern. The sorcerer switches their tactical algorithms instantly based on the opponent's movements.
