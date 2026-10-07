---
title: The Prototype Pattern in VBA
description: Clone existing ethereal constructs to avoid the expensive rituals of creating them from raw magic.
type: vba
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Transmutation // Spreadsheet Necromancy"
formula: |2
  ' Interface: ICloneableRecord (Class Module)
  Public Function Clone() As ICloneableRecord
  End Function
  
  ' Class: CursedRow (Class Module)
  Implements ICloneableRecord
  
  Public DataKey As String
  Public CorruptedValue As Double
  Public HexColor As Long
  
  Private Function ICloneableRecord_Clone() As ICloneableRecord
      Dim newRow As New CursedRow
      newRow.DataKey = Me.DataKey
      newRow.CorruptedValue = Me.CorruptedValue
      newRow.HexColor = Me.HexColor
      Set ICloneableRecord_Clone = newRow
  End Function
  
  ' Client (Standard Module)
  Public Sub DuplicateCurse()
      Dim original As New CursedRow
      original.DataKey = "Soul_Yield"
      original.CorruptedValue = -999.99
      original.HexColor = RGB(139, 0, 0)
      
      Dim copy As CursedRow
      Set copy = original.Clone()
      
      ' The copy is identical but exists independently
      copy.DataKey = "Soul_Yield_Variant"
  End Sub
tags: [vba, prototype, creational, spreadsheet-necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Prototype: The Doppelganger Hex

Why drain your mana creating a new object from scratch when you can simply splinter the soul of an existing one? The Prototype pattern in Spreadsheet Necromancy allows for the rapid duplication of objects. 

This is incredibly useful when dealing with heavily configured classes or complex data structures within userforms. By defining a `Clone` method, you ensure that a precise replica is formed without invoking the expensive initialization rites. It is cellular division, but for your most cursed data structures.
