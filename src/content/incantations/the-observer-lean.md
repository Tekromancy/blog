---
title: "The Observer"
description: "Subscribing auxiliary wards to the fluctuations of a primary core, reacting instantly to any mathematical variance."
type: lean
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Reaction"
formula: |2
  namespace MathematicalWards

  structure Subject (State : Type) where
    state : State
    observers : List (State → State)

  def notify (sub : Subject Nat) : Subject Nat :=
    let newState := sub.observers.foldl (fun s obs => obs s) sub.state
    { sub with state := newState }

  def addObserver (sub : Subject Nat) (obs : Nat → Nat) : Subject Nat :=
    { sub with observers := obs :: sub.observers }

  end MathematicalWards
tags: [behavioral, lean4, observer, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Observer pattern expressed functionally: observers are purely functional state transformers applied in sequence over the subject's state.
