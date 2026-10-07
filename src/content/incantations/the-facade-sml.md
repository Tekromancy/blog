---
title: The Facade of the Progenitor
description: Simplify complex arcane rituals behind a clean module interface.
type: sml
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // Interface Simplification"
formula: |2
  structure Leyline = struct
    fun connect () = print "Connecting to local leyline...\n"
  end
  
  structure AstralPlane = struct
    fun openRift () = print "Tearing rift to the Astral Plane...\n"
  end
  
  structure ManaCore = struct
    fun drawPower () = print "Drawing power from the Mana Core...\n"
  end
  
  signature RITUAL_FACADE = sig
    val performSummoning : unit -> unit
  end
  
  structure SummoningRitual : RITUAL_FACADE = struct
    fun performSummoning () =
      ( Leyline.connect ();
        ManaCore.drawPower ();
        AstralPlane.openRift ();
        print "Summoning complete!\n" )
  end
  
  val _ = SummoningRitual.performSummoning ()
tags: [modules, subsystems, facade]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Facade pattern conceals the complexity of interconnected subsystems. In Standard ML, an adept mage creates a new `structure` that exposes only the highest-level operations via a restrictive `signature`. This completely hides the intricate details of Leylines, Astral Rifts, and Mana Cores from the naive apprentice, who only needs to invoke a single `performSummoning` command.
