---
title: The Adapter
description: A transmutation matrix allowing incompatible Gallina Wards to synchronize their leyline interfaces.
type: coq
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Rebinding"
formula: |2
  (* Gallina Ward: Adapter *)
  Require Import String.
  
  (* Old Ward Interface *)
  Record LegacyWard := {
    castLegacy : string -> string
  }.
  
  (* New Ward Interface *)
  Record ModernWard := {
    castModern : nat -> string
  }.
  
  (* The legacy ward in action *)
  Definition ancientGlyph : LegacyWard := {|
    castLegacy := fun s => "Casting " ++ s
  |}.
  
  (* The Adapter: translating modern numerical resonance to legacy string sigils *)
  Definition wardAdapter (old : LegacyWard) (toString : nat -> string) : ModernWard := {|
    castModern := fun n => old.(castLegacy) (toString n)
  |}.
tags: [adapter, gallina, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
