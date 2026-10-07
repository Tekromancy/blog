---
title: The Singleton of the Progenitor
description: Ensure a single, globally accessible Weave of magic using ML's module system.
type: sml
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Singular Binding"
formula: |2
  signature WEAVE_STATE = sig
    val getEnergy : unit -> int
    val consumeEnergy : int -> unit
  end
  
  structure GlobalWeave : WEAVE_STATE = struct
    val energy = ref 1000
    
    fun getEnergy () = !energy
    
    fun consumeEnergy amount =
      if !energy >= amount then
        energy := !energy - amount
      else
        print "Insufficient arcane energy in the Weave!\n"
  end
  
  (* Usage *)
  val current = GlobalWeave.getEnergy ()
  val _ = GlobalWeave.consumeEnergy 50
tags: [modules, references, global state]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

To achieve a Singleton in the ML Progenitor, we turn to the module system and stateful references. By enclosing a `ref` within a `structure` and exposing only controlled functions via a `signature`, we create a singular, globally accessible entity. The SML compiler ensures that only one instance of `GlobalWeave` exists, making it a true Singleton to harbor the world's arcane energy safely.
