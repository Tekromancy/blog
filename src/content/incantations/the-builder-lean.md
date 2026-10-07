---
title: "The Builder"
description: "Constructs complex mathematical wards step by step, allowing different representations of absolute geometric constructs."
type: lean
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Conjuration // Architecture"
formula: |2
  namespace MathematicalWards

  structure WardConfig where
    layers : Nat := 0
    runes : List String := []
    isAbsolute : Bool := false
    deriving Repr

  def WardConfig.empty : WardConfig := {}

  def WardConfig.addLayer (c : WardConfig) : WardConfig :=
    { c with layers := c.layers + 1 }

  def WardConfig.addRune (c : WardConfig) (rune : String) : WardConfig :=
    { c with runes := rune :: c.runes }

  def WardConfig.seal (c : WardConfig) : WardConfig :=
    { c with isAbsolute := true }

  def buildUltimateWard : WardConfig :=
    WardConfig.empty
      |>.addLayer
      |>.addRune "Alpha"
      |>.addRune "Omega"
      |>.seal

  end MathematicalWards
tags: [creational, lean4, builder, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Using immutable structure updates to mimic the Builder pattern, constructing a mathematical ward with precise control over its configuration.
