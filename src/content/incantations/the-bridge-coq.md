---
title: The Bridge
description: Decoupling a Gallina Ward's ethereal abstraction from its planar implementation.
type: coq
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Conjuration // Structuring"
formula: |2
  (* Gallina Ward: Bridge *)
  Require Import String.
  
  (* The Implementation Interface *)
  Module Type Renderer.
    Parameter render : string -> string.
  End Renderer.
  
  (* Concrete Implementations *)
  Module NeonRenderer <: Renderer.
    Definition render (s : string) := "Neon[" ++ s ++ "]".
  End NeonRenderer.
  
  Module VoidRenderer <: Renderer.
    Definition render (s : string) := "Void{" ++ s ++ "}".
  End VoidRenderer.
  
  (* The Abstraction Interface *)
  Module Type Spell.
    Declare Module R : Renderer.
    Parameter invoke : string -> string.
  End Spell.
  
  (* Refined Abstraction *)
  Module CyberSpell (RImpl : Renderer) <: Spell.
    Module R := RImpl.
    Definition invoke (s : string) :=
      "Invoking: " ++ R.render s.
  End CyberSpell.
tags: [bridge, gallina, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
