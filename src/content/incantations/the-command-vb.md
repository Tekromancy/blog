---
title: The Command of Undo Magic
description: Encapsulating destructive API calls into an undoable history list.
type: vb
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Chronomancy // Time Manipulation"
formula: |2
  ' ICommand.cls
  Public Sub Execute()
  End Sub
  Public Sub Undo()
  End Sub

  ' DeleteRegistryCommand.cls
  Implements ICommand
  Private m_key As String

  Public Sub Init(key As String)
      m_key = key
  End Sub

  Private Sub ICommand_Execute()
      On Error Resume Next
      ' Wipe the key
  End Sub

  Private Sub ICommand_Undo()
      On Error Resume Next
      ' Attempt to restore the key (usually fails)
  End Sub
tags: [command, undo, registry]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Command pattern captures requests as standalone objects, turning destructive Win32 API calls into encapsulated rituals that can be sequenced, logged, or (theoretically) undone.
