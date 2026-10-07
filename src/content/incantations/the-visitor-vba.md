---
title: The Visitor Pattern in VBA
description: Detach powerful enchantments from the entities they operate on, letting external spirits visit and mutate them.
type: vba
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Transmutation // Spreadsheet Necromancy"
formula: |2
  ' Interface: IVisitor (Class Module)
  Public Sub VisitDataCell(cell As DataCellEntity)
  End Sub
  Public Sub VisitHeaderCell(cell As HeaderCellEntity)
  End Sub
  
  ' Interface: IAcceptor (Class Module)
  Public Sub Accept(visitor As IVisitor)
  End Sub
  
  ' Class: DataCellEntity (Class Module)
  Implements IAcceptor
  Public Value As Double
  Private Sub IAcceptor_Accept(visitor As IVisitor)
      visitor.VisitDataCell Me
  End Sub
  
  ' Class: HeaderCellEntity (Class Module)
  Implements IAcceptor
  Public Title As String
  Private Sub IAcceptor_Accept(visitor As IVisitor)
      visitor.VisitHeaderCell Me
  End Sub
  
  ' Class: CorruptionVisitor (Class Module)
  Implements IVisitor
  Private Sub IVisitor_VisitDataCell(cell As DataCellEntity)
      cell.Value = cell.Value * -1 ' Corrupt the data
      Debug.Print "Corrupted Data Cell."
  End Sub
  Private Sub IVisitor_VisitHeaderCell(cell As HeaderCellEntity)
      cell.Title = "CURSED_" & cell.Title
      Debug.Print "Corrupted Header Cell."
  End Sub
  
  ' Client
  Public Sub InvokeVisitor()
      Dim horde As New Collection
      horde.Add New HeaderCellEntity
      horde.Add New DataCellEntity
      
      Dim corruptor As New CorruptionVisitor
      Dim entity As IAcceptor
      
      For Each entity In horde
          entity.Accept corruptor
      Next entity
  End Sub
tags: [vba, visitor, behavioral, spreadsheet-necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

# The Visitor: The Wandering Spirit

As your grid constructs grow increasingly complex, you will find yourself needing to add new operations across an entire hierarchy of classes. Adding new methods to every single class for every new operation creates bloated, unfocused objects.

The Visitor pattern extracts the operation into a separate class (the `IVisitor`). Your cell entities only need a single `Accept` method. When the `CorruptionVisitor` wanders through your collection of entities, it applies the specific logic suited to each entity type without those entities needing to understand the nature of the corruption themselves. It is the purest form of decoupling behavior from structure.
