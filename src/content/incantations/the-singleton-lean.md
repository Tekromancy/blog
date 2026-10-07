---
title: "The Singleton"
description: "A singular absolute mathematical truth from which all local wards derive."
type: lean
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Divination // Truth"
formula: |2
  namespace MathematicalWards

  inductive AbsoluteTruth where
    | uniqueInstance : AbsoluteTruth

  def getTruth : AbsoluteTruth :=
    AbsoluteTruth.uniqueInstance

  def Truth.axiom (t : AbsoluteTruth) : String :=
    "1 + 1 = 2"

  end MathematicalWards
tags: [creational, lean4, singleton, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
The Singleton pattern in Lean 4 is naturally expressed by defining a type with exactly one constructor, ensuring that mathematically only one instance can ever exist.
