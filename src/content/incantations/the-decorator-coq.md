---
title: The Decorator
description: Layering resonant enchantments upon a Gallina Ward without mutating its core structural proofs.
type: coq
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Enchantment // Augmentation"
formula: |2
  (* Gallina Ward: Decorator *)
  Require Import String.
  
  Record Shield := {
    deflect : string -> string
  }.
  
  Definition baseShield : Shield := {|
    deflect := fun atk => "Blocked " ++ atk
  |}.
  
  Definition addFireThorns (s : Shield) : Shield := {|
    deflect := fun atk => s.(deflect) atk ++ " and burned attacker"
  |}.
  
  Definition addVoidMirror (s : Shield) : Shield := {|
    deflect := fun atk => s.(deflect) atk ++ " and reflected into void"
  |}.
  
  Definition ultimateWard : Shield :=
    addVoidMirror (addFireThorns baseShield).
tags: [decorator, gallina, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
