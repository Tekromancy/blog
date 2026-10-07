---
title: The State
description: Morphing the behavior of a magical automaton based on its internal elemental attunement.
type: ocaml
gofPattern: State
gofCategory: Behavioral
arcaneSchool: Transmutation // Automaton Core
formula: |
  type state = Idle | Aggressive | Defensive
  
  let react state event =
    match state, event with
    | Idle, "attacked" -> Aggressive
    | Aggressive, "calmed" -> Defensive
    | _, _ -> state
    
  let current_core = ref Idle
  let process_event ev =
    current_core := react !current_core ev
tags: [Caml Metamagic, State Machines, OCaml]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The State pattern is naturally expressed as a Finite State Machine using variant types and pattern matching, elegantly dictating the automaton's reactions.
