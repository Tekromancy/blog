---
title: The Flyweight
description: Compressing planar memory by sharing intrinsic state across thousands of ephemeral Gallina Wards.
type: coq
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Condensation"
formula: |2
  (* Gallina Ward: Flyweight *)
  Require Import String.
  
  (* Intrinsic State (Shared) *)
  Record GlyphCore := {
    symbol : string;
    baseResonance : nat
  }.
  
  (* Extrinsic State (Context-dependent) *)
  Record CastGlyph := {
    core : GlyphCore;
    x_pos : nat;
    y_pos : nat
  }.
  
  Definition FireGlyphCore : GlyphCore := {|
    symbol := "Ignis";
    baseResonance := 50
  |}.
  
  (* Thousands of casts can share the same memory-efficient FireGlyphCore *)
  Definition cast1 := {| core := FireGlyphCore; x_pos := 10; y_pos := 20 |}.
  Definition cast2 := {| core := FireGlyphCore; x_pos := 15; y_pos := 25 |}.
tags: [flyweight, gallina, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
