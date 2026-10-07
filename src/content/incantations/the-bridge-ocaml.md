---
title: The Bridge
description: Decoupling the ethereal essence of a spell from its physical manifestation.
type: ocaml
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: Transmutation // Essence Separation
formula: |
  module type CATALYST = sig
    val trigger : string -> unit
  end
  
  module FireCatalyst : CATALYST = struct
    let trigger name = Printf.printf "%s bursts into flames!\n" name
  end
  
  module Spell (C : CATALYST) = struct
    let incant name = 
      Printf.printf "Chanting...\n";
      C.trigger name
  end
  
  module Fireball = Spell(FireCatalyst)
tags: [Caml Metamagic, Functors, OCaml]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Bridge pattern relies on OCaml Functors to separate the catalyst mechanism from the magical invocation, forging powerful composite spells.
