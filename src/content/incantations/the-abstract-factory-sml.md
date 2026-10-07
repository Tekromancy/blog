---
title: The Abstract Factory of the Progenitor
description: Forge cohesive families of arcane constructs using Standard ML's powerful functors.
type: sml
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Modular Weaving"
formula: |2
  signature SPELL = sig
    val cast : unit -> string
  end
  
  signature WAND = sig
    val wave : unit -> string
  end
  
  signature ARCANE_FACTORY = sig
    structure Spell : SPELL
    structure Wand : WAND
  end
  
  structure FireFactory : ARCANE_FACTORY = struct
    structure Spell = struct
      fun cast () = "Casting Fireball!"
    end
    structure Wand = struct
      fun wave () = "Waving the Ruby Wand."
    end
  end
  
  structure IceFactory : ARCANE_FACTORY = struct
    structure Spell = struct
      fun cast () = "Casting Frost Nova!"
    end
    structure Wand = struct
      fun wave () = "Waving the Sapphire Wand."
    end
  end
  
  functor Wizard(F : ARCANE_FACTORY) = struct
    fun performMagic () =
      F.Wand.wave () ^ " " ^ F.Spell.cast ()
  end
  
  structure FireWizard = Wizard(FireFactory)
  val invocation = FireWizard.performMagic ()
tags: [functors, signatures, family]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Abstract Factory pattern in Standard ML (The ML Progenitor) is elegantly handled by the module system. We define `signatures` for our abstract products and the factory itself. Concrete implementations are `structures`, and clients that depend on the factory are written as `functors`, taking the factory structure as a parameter to ensure that arcane components are strictly from the same cohesive family.
