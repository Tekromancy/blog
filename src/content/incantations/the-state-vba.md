---
title: The State Pattern in VBA
description: Allow an entity to drastically alter its behavior when its internal essence shifts between phases of life and death.
type: vba
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Spreadsheet Necromancy"
formula: |2
  ' Interface: ICellState (Class Module)
  Public Sub HandleEdit(context As CellContext)
  End Sub
  
  ' Class: CellContext (Class Module)
  Public State As ICellState
  Public Target As Range
  
  Public Sub Init(targetRange As Range, initialState As ICellState)
      Set Target = targetRange
      Set State = initialState
  End Sub
  
  Public Sub RequestEdit()
      State.HandleEdit Me
  End Sub
  
  ' Class: UnlockedState (Class Module)
  Implements ICellState
  Private Sub ICellState_HandleEdit(context As CellContext)
      Debug.Print "Cell edited normally."
      ' Perhaps transition to cursed upon edit
      Set context.State = New CursedState
  End Sub
  
  ' Class: CursedState (Class Module)
  Implements ICellState
  Private Sub ICellState_HandleEdit(context As CellContext)
      Debug.Print "Edit rejected! Cell is cursed."
      context.Target.Interior.Color = RGB(255, 0, 0)
  End Sub
tags: [vba, state, behavioral, spreadsheet-necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The State: The Phases of the Moon

An object that changes its behavior based on its status—such as an approval workflow that is "Pending", "Approved", or "Rejected"—often ends up with massive `Select Case` statements scattered throughout its methods. 

The State pattern extracts these behaviors into individual state classes. A `CellContext` holds a reference to an `ICellState`. When a method is invoked, it delegates the action to its current state object. The state itself can then transition the context to a new state. It is a seamless transmutation, allowing the entity to evolve from a benign unlocked cell into an enraged, cursed grid space dynamically.
