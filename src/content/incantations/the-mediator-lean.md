---
title: "The Mediator"
description: "A centralized focal point that orchestrates the flow of mana between disconnected sub-wards."
type: lean
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Orchestration"
formula: |2
  namespace MathematicalWards

  inductive WardEvent where
    | breach
    | stabilize

  structure WardState where
    shieldActive : Bool
    alertLevel : Nat

  def mediate (event : WardEvent) (state : WardState) : WardState :=
    match event with
    | WardEvent.breach => { state with shieldActive := true, alertLevel := state.alertLevel + 1 }
    | WardEvent.stabilize => { state with shieldActive := false, alertLevel := 0 }

  end MathematicalWards
tags: [behavioral, lean4, mediator, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
A state transition function acts as the central Mediator, processing events and updating the interconnected system state immutably.
