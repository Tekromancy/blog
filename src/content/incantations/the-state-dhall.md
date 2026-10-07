---
title: State in Dhall
description: Map pure transitions across an enumerated set of runic conditions.
type: dhall
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Flow"
formula: |2
  let State = < Dormant | Glowing | Blazing >
  
  let transition = \(s : State) -> \(mana : Natural) ->
        merge
          { Dormant = if Natural/isZero mana then State.Dormant else State.Glowing
          , Glowing = if Natural/isZero mana then State.Dormant else State.Blazing
          , Blazing = State.Blazing
          }
          s
  
  in  transition State.Glowing 10
tags: [dhall, halting, runes, configuration, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The **State** pattern is managed purely via transition functions over unions. A deterministic Finite State Machine (FSM) works flawlessly in Dhall: given an initial state and an input parameter, it perfectly yields the next state. The execution is bounded, making it entirely predictable for large infrastructure generation.
