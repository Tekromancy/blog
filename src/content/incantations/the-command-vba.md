---
title: The Command Pattern in VBA
description: Encapsulate a macro execution as a solitary object, enabling queues, logs, and undo functionality.
type: vba
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Spreadsheet Necromancy"
formula: |2
  ' Interface: ICommand (Class Module)
  Public Sub Execute()
  End Sub
  Public Sub Undo()
  End Sub
  
  ' Class: CursedWriteCommand (Class Module)
  Implements ICommand
  Private pTarget As Range
  Private pPrevValue As Variant
  Private pNewValue As Variant
  
  Public Sub Init(target As Range, newValue As Variant)
      Set pTarget = target
      pPrevValue = target.Value
      pNewValue = newValue
  End Sub
  
  Private Sub ICommand_Execute()
      pTarget.Value = pNewValue
      pTarget.Interior.Color = RGB(255, 0, 0)
  End Sub
  
  Private Sub ICommand_Undo()
      pTarget.Value = pPrevValue
      pTarget.Interior.Pattern = xlNone
  End Sub
  
  ' Client
  Public Sub CommandInvocation()
      Dim cmd As New CursedWriteCommand
      cmd.Init Sheet1.Range("A1"), "Torment"
      
      ' The Invoker
      cmd.Execute
      
      ' Regret
      cmd.Undo
  End Sub
tags: [vba, command, behavioral, spreadsheet-necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Command: The Spell Scroll

In VBA, executing a macro typically instantly mutates the Grid, destroying the built-in undo stack. This is a terrifying prospect for the uninitiated user who accidentally invokes a spreadsheet wipe.

The Command pattern turns an action into a standalone object. By implementing both `Execute` and `Undo` methods, and storing the previous state (the cell's prior value and format) within the object itself, you create a Spell Scroll. These scrolls can be queued, logged, or reversed, granting you the ability to turn back time and undo the dark rituals cast upon the Grid.
