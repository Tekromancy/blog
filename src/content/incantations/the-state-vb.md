---
title: The State of the Finite Machine
description: Swapping out behavior based on the current tier of corruption.
type: vb
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Phase Shifting"
formula: |2
  ' IState.cls
  Public Sub Handle(context As Object)
  End Sub

  ' CorruptedState.cls
  Implements IState
  Private Sub IState_Handle(context As Object)
      MsgBox "System is corrupted. Ignoring input."
      ' Transition to catastrophic failure
  End Sub
tags: [state, fsm, behavior]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
When an application's logic is paralyzed by complex conditional blocks tracking "modes", the State pattern encapsulates each mode into its own object, cleanly managing the descent into madness.
