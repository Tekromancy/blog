---
title: The Chain of Responsibility of the Progenitor
description: Pass a magical request along a chain of potential handlers.
type: sml
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Sequential Wards"
formula: |2
  type request = string
  type handler = request -> string option
  
  fun fireWard req =
    if req = "Fireball" then SOME "Fire Ward absorbed the Fireball."
    else NONE
    
  fun frostWard req =
    if req = "Frost Nova" then SOME "Frost Ward shattered the Nova."
    else NONE
    
  fun chain [] req = "Request breached all wards!"
    | chain (h::hs) req =
        case h req of
            SOME res => res
          | NONE => chain hs req
          
  val myWards = [fireWard, frostWard]
  
  val result1 = chain myWards "Frost Nova"
  val result2 = chain myWards "Arcane Missile"
tags: [options, lists, recursion]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Chain of Responsibility is elegantly translated into SML by creating a list of functions that each return an `option` type. If a handler successfully processes the request, it returns `SOME result`. If it cannot, it returns `NONE`, prompting a recursive loop to pass the request to the next handler in the sequence.
