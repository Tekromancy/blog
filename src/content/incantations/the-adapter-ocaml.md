---
title: The Adapter
description: Translating ancient dialects into modern somatic components via wrapper functions.
type: ocaml
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Semantic Shift"
formula: |2
  module type ANCIENT_RUNE = sig
    val cast_ancient : string -> int
  end

  module type MODERN_SPELL = sig
    val cast : string -> string
  end

  module RuneAdapter (A : ANCIENT_RUNE) : MODERN_SPELL = struct
    let cast spell = 
      let power = A.cast_ancient spell in
      "Spell channeled with power level: " ^ string_of_int power
  end
tags: [Caml Metamagic, Functors, OCaml]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Adapting the old ways to the new requires semantic shifting. Functors in OCaml effortlessly translate ancient module signatures into modern expectations.
