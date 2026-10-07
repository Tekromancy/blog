---
title: The State of the Progenitor
description: Embody shifting arcane stances via mutually recursive functions.
type: sml
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Form Shifting"
formula: |2
  datatype input = Attack | Defend | Rest
  
  fun berserkerState input =
    case input of
        Attack => (print "Furious Strike!\n"; berserkerState)
      | Defend => (print "Too angry to block!\n"; berserkerState)
      | Rest => (print "Calming down...\n"; calmState)
      
  and calmState input =
    case input of
        Attack => (print "Entering Bloodrage!\n"; berserkerState)
      | Defend => (print "Raising Shield.\n"; calmState)
      | Rest => (print "Sleeping...\n"; calmState)
      
  (* The engine loops, holding the state as a function *)
  fun runWarden state [] = print "Battle ends.\n"
    | runWarden state (i::is) =
        let val nextState = state i
        in runWarden nextState is end
        
  val _ = runWarden calmState [Defend, Attack, Attack, Rest]
tags: [recursion, state machine, datatypes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Object-oriented design achieves the State pattern through polymorphic objects updating a reference. In the functional grace of SML, a State is merely a function that processes an input and returns the *next* state function. Mutually recursive functions (`fun ... and ...`) create pure, side-effect-free state machines to model shifting combat stances effortlessly.
