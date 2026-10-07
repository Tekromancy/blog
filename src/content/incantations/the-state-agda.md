---
title: "The State Morph"
description: "Altering an object's behavior when its internal state changes."
type: agda
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Polymorphism"
formula: |2
  module StatePattern where
  
  open import Data.String
  
  record State : Set where
    field handle : String → String
    
  record Context : Set where
    field currentState : State
tags: ["agda", "state", "fsm"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The State Morph

A weapon might act as a sword or an energy whip depending on its internal heat capacity. The **State Morph** pattern treats each mode as a distinct entity, seamlessly swapping its operational core at runtime.

## The Dependent Runes

In functional lands, this is a Finite State Machine. A Context carries the current `State` behavior dictionary. State transitions are just functions returning a modified Context.
