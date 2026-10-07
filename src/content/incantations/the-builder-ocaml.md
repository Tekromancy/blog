---
title: The Builder
description: Constructing complex arcane constructs step-by-step through functional record updates.
type: ocaml
gofPattern: Builder
gofCategory: Creational
arcaneSchool: Transmutation // Construct Assembly
formula: |
  type golem = {
    head : string option;
    torso : string option;
    arms : int;
    legs : int;
  }
  
  let base_golem = { head = None; torso = None; arms = 0; legs = 0 }
  
  let with_head h g = { g with head = Some h }
  let with_torso t g = { g with torso = Some t }
  let with_limbs a l g = { g with arms = a; legs = l }
  
  let build () = 
    base_golem
    |> with_head "Obsidian Skull"
    |> with_torso "Clay Chest"
    |> with_limbs 2 2
tags: [Caml Metamagic, Records, Pipelining, OCaml]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Builder pattern takes form through functional pipelining, where each incantation refines the construct's shape without mutating the original matrix.
