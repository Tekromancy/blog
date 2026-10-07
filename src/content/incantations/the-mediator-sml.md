---
title: The Mediator of the Progenitor
description: Centralize the chaotic communication between magical factions.
type: sml
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Harmonic Alignment"
formula: |2
  signature MEDIATOR = sig
    val notify : string * string -> unit
  end
  
  structure BattlefieldMediator : MEDIATOR = struct
    fun notify ("Mage", event) =
        print ("Mediator tells Knight: Protect the Mage! Event: " ^ event ^ "\n")
      | notify ("Knight", event) =
        print ("Mediator tells Mage: Provide covering fire! Event: " ^ event ^ "\n")
      | notify _ = ()
  end
  
  structure Mage = struct
    fun castSpell () =
      (print "Mage casts a spell.\n";
       BattlefieldMediator.notify ("Mage", "SpellCasted"))
  end
  
  structure Knight = struct
    fun charge () =
      (print "Knight charges forward.\n";
       BattlefieldMediator.notify ("Knight", "Charged"))
  end
  
  val _ = Mage.castSpell ()
tags: [modules, coupling, message passing]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When too many structures attempt to communicate directly, chaotic dependencies form. The Mediator pattern resolves this by introducing a central `structure` that handles all cross-module interactions. In our arcane rituals, the `BattlefieldMediator` interprets the actions of the `Mage` and `Knight` and orchestrates their responses, leaving the factions delightfully decoupled.
