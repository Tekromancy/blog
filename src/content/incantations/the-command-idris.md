---
title: "The Command: Encapsulated Edicts"
description: "Transforming arcane directives into standalone mathematical objects."
type: idris
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Edict-Binding"
formula: |2
  module Command
  
  -- The receiver
  record LeylineGrid where
    constructor MkGrid
    energy : Nat
  
  -- The command type
  CommandFunc : Type
  CommandFunc = LeylineGrid -> LeylineGrid
  
  chargeGrid : Nat -> CommandFunc
  chargeGrid amount (MkGrid e) = MkGrid (e + amount)
  
  drainGrid : Nat -> CommandFunc
  drainGrid amount (MkGrid e) = 
    if e >= amount then MkGrid (e - amount) else MkGrid 0
  
  -- Invoker
  executeCommands : List CommandFunc -> LeylineGrid -> LeylineGrid
  executeCommands cmds grid = foldl (\g, c => c g) grid cmds
tags: [behavioral, higher-order-functions, state-manipulation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

An edict uttered by an Archmage must sometimes be delayed, queued, or reversed. The Command pattern crystallizes an action into an independent entity—a pure function traversing the state of the `LeylineGrid`. The Theorem Proving Pacts allow these encapsulated spells to be stored in arrays and executed synchronously, ensuring no magical energy is inexplicably lost or duplicated during the transition.
