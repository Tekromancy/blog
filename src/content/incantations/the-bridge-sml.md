---
title: The Bridge of the Progenitor
description: Decouple a spell's abstraction from its elemental implementation.
type: sml
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Elemental Decoupling"
formula: |2
  signature ELEMENT = sig
    val manifest : string -> string
  end
  
  structure FireElement : ELEMENT = struct
    fun manifest shape = "A blazing " ^ shape ^ " of fire!"
  end
  
  structure FrostElement : ELEMENT = struct
    fun manifest shape = "A freezing " ^ shape ^ " of solid ice!"
  end
  
  signature SPELL_SHAPE = sig
    val conjure : unit -> string
  end
  
  functor SphereSpell (E : ELEMENT) : SPELL_SHAPE = struct
    fun conjure () = E.manifest "sphere"
  end
  
  functor WallSpell (E : ELEMENT) : SPELL_SHAPE = struct
    fun conjure () = E.manifest "wall"
  end
  
  structure FireWall = WallSpell(FireElement)
  structure FrostSphere = SphereSpell(FrostElement)
  
  val cast1 = FireWall.conjure ()
  val cast2 = FrostSphere.conjure ()
tags: [functors, decoupling, dimensions]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Bridge pattern separates an abstraction from its implementation so both can vary independently. Under the ML Progenitor's guidance, this is the classic use case for `functors`. We define implementations (Elements) as structures matching a signature, and abstractions (Spell Shapes) as functors that take those elements as parameters. Thus, mages can infinitely mix and match spell shapes with elements.
