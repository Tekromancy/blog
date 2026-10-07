---
title: The Abstract Factory of Verified Runes
description: Constructing families of related arcane glyphs with strict verification.
type: fstar
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Runemancy"
formula: |2
  module AbstractFactory
  
  type rune_type = | FireRune | IceRune
  
  noeq type rune_factory = {
    create_rune : unit -> string;
    validate_rune : string -> bool;
  }
  
  let fire_factory : rune_factory = {
    create_rune = (fun () -> "Scorching Glyph");
    validate_rune = (fun r -> r = "Scorching Glyph");
  }
  
  let ice_factory : rune_factory = {
    create_rune = (fun () -> "Frost Sigil");
    validate_rune = (fun r -> r = "Frost Sigil");
  }
tags: [creation, verification, runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

An abstract factory that generates runic matrices, ensuring that their composition remains internally consistent via F*'s type system.
