---
title: The Factory Method of the Progenitor
description: Delegate the creation of enchanted items to specialized constructor functions.
type: sml
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Summoning Construct"
formula: |2
  datatype element = Fire | Frost | Arcane
  
  signature SCROLL = sig
    val read : unit -> string
  end
  
  fun createScroll Fire = 
      let structure S = struct fun read () = "Burns your hands!" end 
      in S.read end
    | createScroll Frost = 
      let structure S = struct fun read () = "Chills your soul!" end 
      in S.read end
    | createScroll Arcane = 
      let structure S = struct fun read () = "Expands your mind!" end 
      in S.read end
      
  (* Functional approach to Factory Method *)
  fun invokeScrollFactory elem = createScroll elem
  
  val castFire = invokeScrollFactory Fire ()
tags: [constructors, pattern matching]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Factory Method in the ML Progenitor is seamlessly supplanted by Standard ML's algebraic datatypes and pattern matching. A single constructor function matches on the variants of a domain and yields the correct implementation. This pure functional approach ensures exhaustiveness checks by the SML compiler, preventing a careless apprentice from forgetting to handle a new mystical element.
