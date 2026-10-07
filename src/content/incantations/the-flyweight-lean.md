---
title: "The Flyweight"
description: "Sharing geometric constants to drastically reduce the mana footprint of an absolute ward."
type: lean
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Conjuration // Compression"
formula: |2
  namespace MathematicalWards

  structure SharedRune where
    geometry : String
    manaCost : Nat
    deriving Repr, BEq

  structure WardNode where
    rune : SharedRune
    x : Nat
    y : Nat

  def alphaRune : SharedRune := { geometry := "Circle", manaCost := 10 }
  def omegaRune : SharedRune := { geometry := "Triangle", manaCost := 15 }

  def constructGrid : List WardNode :=
    [ { rune := alphaRune, x := 0, y := 0 },
      { rune := alphaRune, x := 1, y := 0 },
      { rune := omegaRune, x := 0, y := 1 } ]

  end MathematicalWards
tags: [structural, lean4, flyweight, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
In purely functional Lean 4, values are naturally shared. The Flyweight pattern is implicit when reusing immutable definitions across large collections of objects.
