---
title: The Command of the Progenitor
description: Encapsulate incantations as first-class closures to be executed at will.
type: sml
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Delayed Invocation"
formula: |2
  type command = unit -> unit
  
  fun createHeal target amount () =
    print ("Healing " ^ target ^ " for " ^ Int.toString amount ^ " HP.\n")
    
  fun createDamage target amount () =
    print ("Striking " ^ target ^ " for " ^ Int.toString amount ^ " damage.\n")
    
  structure Invoker = struct
    val queue : command list ref = ref []
    
    fun store cmd = queue := !queue @ [cmd]
    
    fun executeAll () =
      (app (fn c => c ()) (!queue);
       queue := [])
  end
  
  (* Usage *)
  val _ = Invoker.store (createHeal "Ally" 50)
  val _ = Invoker.store (createDamage "Goblin" 100)
  val _ = Invoker.executeAll ()
tags: [closures, higher-order functions, lazy evaluation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

In the object-oriented world, the Command pattern requires complex classes to encapsulate actions. The ML Progenitor favors closures. By defining a command as a `unit -> unit` function, we encapsulate the receiver, the method, and the arguments within the closure's environment. These functions can be stored in lists, passed around, and evaluated when the arcane timing is perfect.
