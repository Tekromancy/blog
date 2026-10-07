---
title: The Memento Pattern in VBA
description: Capture the ephemeral soul of an object, storing it safely in a phylactery so that it may be resurrected later.
type: vba
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Necromancy // Spreadsheet Necromancy"
formula: |2
  ' Class: CellPhylactery (Class Module) - The Memento
  Public StoredValue As Variant
  Public StoredColor As Long
  
  ' Class: CellEntity (Class Module) - The Originator
  Private pTarget As Range
  
  Public Sub Bind(target As Range)
      Set pTarget = target
  End Sub
  
  Public Sub Mutate(val As Variant, color As Long)
      pTarget.Value = val
      pTarget.Interior.Color = color
  End Sub
  
  Public Function SaveSoul() As CellPhylactery
      Dim phylactery As New CellPhylactery
      phylactery.StoredValue = pTarget.Value
      phylactery.StoredColor = pTarget.Interior.Color
      Set SaveSoul = phylactery
  End Function
  
  Public Sub RestoreSoul(phylactery As CellPhylactery)
      pTarget.Value = phylactery.StoredValue
      pTarget.Interior.Color = phylactery.StoredColor
  End Sub
  
  ' Client
  Public Sub NecromanticUndo()
      Dim entity As New CellEntity
      entity.Bind Sheet1.Range("A1")
      entity.Mutate "Pure", RGB(255, 255, 255)
      
      ' Save state
      Dim backup As CellPhylactery
      Set backup = entity.SaveSoul()
      
      ' Corrupt
      entity.Mutate "Corrupted", RGB(0, 0, 0)
      
      ' Restore
      entity.RestoreSoul backup
  End Sub
tags: [vba, memento, behavioral, spreadsheet-necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Memento: The Phylactery

When a necromancer experiments with highly destructive data mutations, there must always be a path back from the abyss. The Memento pattern allows you to capture an object's internal state without exposing its private fields to the world.

By generating a `CellPhylactery` (the Memento), the `CellEntity` (the Originator) hands off a snapshot of its soul to a Caretaker object. If the subsequent rituals go awry and the data is corrupted beyond recognition, the entity can inhale the phylactery, instantly restoring its previous form. It is the ultimate safeguard against permanent destruction.
