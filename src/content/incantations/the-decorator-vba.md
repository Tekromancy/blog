---
title: The Decorator Pattern in VBA
description: Wrap an object in dark enchantments dynamically, adding behaviors without altering the core structure.
type: vba
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Spreadsheet Necromancy"
formula: |2
  ' Interface: ICellFormatter (Class Module)
  Public Sub ApplyFormat(target As Range)
  End Sub
  
  ' Class: BaseFormatter (Class Module)
  Implements ICellFormatter
  Private Sub ICellFormatter_ApplyFormat(target As Range)
      target.Value = "Raw Soul"
  End Sub
  
  ' Class: BloodRedDecorator (Class Module)
  Implements ICellFormatter
  Private pWrappee As ICellFormatter
  
  Public Sub Init(wrappee As ICellFormatter)
      Set pWrappee = wrappee
  End Sub
  
  Private Sub ICellFormatter_ApplyFormat(target As Range)
      ' Execute base
      pWrappee.ApplyFormat target
      ' Add new behavior
      target.Interior.Color = RGB(139, 0, 0)
  End Sub
  
  ' Client
  Public Sub DecorateCell()
      Dim base As ICellFormatter
      Set base = New BaseFormatter
      
      Dim decorated As New BloodRedDecorator
      decorated.Init base
      
      decorated.ICellFormatter_ApplyFormat Sheet1.Range("A1")
  End Sub
tags: [vba, decorator, structural, spreadsheet-necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Decorator: Layers of the Shroud

Subclassing in VBA is impossible, but the Decorator pattern provides a powerful alternative for adding functionality dynamically. Instead of creating a massive class with dozens of boolean flags for formatting options, you create discrete wrapper classes.

By passing a core `ICellFormatter` into a `BloodRedDecorator`, you wrap the object in a new layer of logic. This is the art of weaving a dark shroud: each layer adds its own curse to the target cell, stacking effects without modifying the underlying construct.
