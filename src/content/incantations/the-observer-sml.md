---
title: The Observer of the Progenitor
description: Establish a network of scrying eyes tied to a mutable core.
type: sml
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying Network"
formula: |2
  type event = string
  type observer = event -> unit
  
  structure Subject = struct
    val observers : observer list ref = ref []
    
    fun subscribe obs = observers := obs :: !observers
    
    fun notify event =
      app (fn obs => obs event) (!observers)
      
    fun stateChange () =
      (print "The Leyline shifts!\n";
       notify "LeylineShift")
  end
  
  fun archmageObserver e = print ("Archmage senses: " ^ e ^ "\n")
  fun apprenticeObserver e = print ("Apprentice panics over: " ^ e ^ "\n")
  
  val _ = Subject.subscribe archmageObserver
  val _ = Subject.subscribe apprenticeObserver
  val _ = Subject.stateChange ()
tags: [callbacks, references, events]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Observer pattern is established using lists of callback closures stored in a mutable reference (`ref`). As the subject experiences magical shifts, it iterates through its registry of scrying eyes, eagerly applying the event to each observer function. This establishes a fully decoupled publish-subscribe network, essential for monitoring the chaotic Leylines.
