---
title: The Decorator of the Progenitor
description: Augment base spell effects through function composition.
type: sml
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Effect Augmentation"
formula: |2
  type spell = int -> string
  
  fun baseDamage damage = 
    "Deals " ^ Int.toString damage ^ " damage."
  
  fun empower (s: spell) (damage: int) =
    s (damage * 2) ^ " (Empowered!)"
    
  fun addBurn (s: spell) (damage: int) =
    s damage ^ " Also applies burn for 3 seconds."
  
  (* Composing the decorators *)
  val ultimateFireball = addBurn (empower baseDamage)
  
  val result = ultimateFireball 50
tags: [higher-order functions, composition, wrappers]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

In the pure functional streams of the ML Progenitor, the Decorator pattern translates directly to higher-order functions. Rather than wrapping objects, an Archmage simply passes a function to another function that adds behavior before, after, or around the original invocation. This functional composition enables infinite, elegant spell augmentations without cumbersome inheritance hierarchies.
