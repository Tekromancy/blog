---
title: "The Strategy"
description: "Hot-swapping mathematical theorems to adapt the ward's defensive geometry on the fly."
type: lean
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Transmutation // Theorems"
formula: |2
  namespace MathematicalWards

  def Strategy := Nat → Nat

  def linearDefense : Strategy := fun x => x * 2
  def exponentialDefense : Strategy := fun x => x * x

  structure DynamicWard where
    mana : Nat
    currentStrategy : Strategy

  def executeDefense (w : DynamicWard) : Nat :=
    w.currentStrategy w.mana

  def adaptWard (w : DynamicWard) : DynamicWard :=
    { w with currentStrategy := exponentialDefense }

  end MathematicalWards
tags: [behavioral, lean4, strategy, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
The Strategy pattern in functional languages is merely first-class functions passed as data, allowing dynamic reassignment of behavior.
