---
title: "The State"
description: "Altering the geometric behavior of a ward as its internal stability degrades or ascends."
type: lean
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Phase"
formula: |2
  namespace MathematicalWards

  inductive Stability where
    | dormant
    | active
    | critical

  def reactToThreat (s : Stability) : String × Stability :=
    match s with
    | Stability.dormant => ("Awakening...", Stability.active)
    | Stability.active => ("Defending...", Stability.critical)
    | Stability.critical => ("Overloading!", Stability.dormant)

  end MathematicalWards
tags: [behavioral, lean4, state, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Using a finite state machine representation, transitioning through states explicitly via a function returning a tuple of output and new state.
