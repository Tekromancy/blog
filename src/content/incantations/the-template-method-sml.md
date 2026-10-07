---
title: The Template Method of the Progenitor
description: Define the skeleton of an ancient ritual, deferring steps to specific traditions.
type: sml
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Conjuration // Ritual Frameworks"
formula: |2
  signature RITUAL_HOOKS = sig
    val prepare : unit -> string
    val finalize : unit -> string
  end
  
  functor RitualEngine(Hooks : RITUAL_HOOKS) = struct
    fun executeRitual () =
      ( print (Hooks.prepare () ^ "\n");
        print "Chanting core universal runes...\n";
        print (Hooks.finalize () ^ "\n") )
  end
  
  structure NecromancyHooks : RITUAL_HOOKS = struct
    fun prepare () = "Drawing a circle of bone dust."
    fun finalize () = "A skeleton rises!"
  end
  
  structure PyromancyHooks : RITUAL_HOOKS = struct
    fun prepare () = "Lighting the four brazers."
    fun finalize () = "The flames roar with life!"
  end
  
  structure NecroRitual = RitualEngine(NecromancyHooks)
  val _ = NecroRitual.executeRitual ()
tags: [functors, inversion of control, skeletons]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Template Method shines bright under the influence of SML's functor system. The skeleton algorithm is encapsulated inside a `functor`, which takes a `structure` containing the specific hooks as an argument. The framework dictates the flow of the ritual, invoking the universal chants, while seamlessly deferring the localized preparations and climaxes to the provided module.
