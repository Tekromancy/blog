---
title: "The Command"
description: "Reifying magical directives into purely functional structures that can be logged, queued, or reversed."
type: lean
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Directives"
formula: |2
  namespace MathematicalWards

  inductive WardCommand where
    | ignite (power : Nat)
    | extinguish
    | recalibrate (offset : Int)

  def executeCommand (state : Nat) (cmd : WardCommand) : Nat :=
    match cmd with
    | WardCommand.ignite p => state + p
    | WardCommand.extinguish => 0
    | WardCommand.recalibrate o => (state : Int) + o |>.toNat

  def executeAll (initial : Nat) (cmds : List WardCommand) : Nat :=
    cmds.foldl executeCommand initial

  end MathematicalWards
tags: [behavioral, lean4, command, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Using an algebraic data type to represent operations as values, allowing them to be stored and executed systematically.
