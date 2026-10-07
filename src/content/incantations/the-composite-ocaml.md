---
title: The Composite
description: Structuring complex magical sigils using recursive algebraic data types.
type: ocaml
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Conjuration // Fractal Geometry"
formula: |2
  type sigil =
    | Glyph of string
    | Compound of sigil list

  let rec activate = function
    | Glyph name -> Printf.printf "Activating %s\n" name
    | Compound sigils -> List.iter activate sigils

  let master_sigil = Compound [
    Glyph "Fire";
    Compound [Glyph "Wind"; Glyph "Spark"];
  ]
tags: [Caml Metamagic, ADTs, Recursion, OCaml]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Composite pattern naturally arises from OCaml's Algebraic Data Types. Tree-like magical sigils can be evaluated uniformly through recursive incantations.
