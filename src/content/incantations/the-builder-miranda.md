---
title: The Builder of the Ancestral Monad
description: Constructing complex data structures step by step through monadic composition.
type: miranda
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Conjuration // Ancestral Monad"
formula: |2
  || The Ancestral Monad builds reality piece by piece.
  
  builder_state == (string, num, bool)
  
  initial_builder :: builder_state
  initial_builder = ("", 0, False)
  
  set_name :: string -> builder_state -> builder_state
  set_name n (name, age, active) = (n, age, active)
  
  set_age :: num -> builder_state -> builder_state
  set_age a (name, age, active) = (name, a, active)
  
  set_active :: bool -> builder_state -> builder_state
  set_active act (name, age, active) = (name, age, act)
  
  build :: builder_state -> string
  build (n, a, act) = "Entity: " ++ n ++ " Age: " ++ show a ++ " Active: " ++ show act
  
  || Monadic-like sequencing via function composition
  director :: builder_state -> string
  director = build . set_active True . set_age 42 . set_name "MonadicEntity"
tags: [miranda, creational, builder, ancestral-monad]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
