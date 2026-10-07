---
title: The Composite Pattern in VBA
description: Treat individual cells and entire workbooks uniformly, building recursive trees of magical data.
type: vba
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Conjuration // Spreadsheet Necromancy"
formula: |2
  ' Interface: IGridComponent (Class Module)
  Public Sub Corrupt()
  End Sub
  
  ' Class: SingleCell (Class Module)
  Implements IGridComponent
  Private pAddress As String
  
  Public Sub Init(addr As String)
      pAddress = addr
  End Sub
  
  Private Sub IGridComponent_Corrupt()
      Debug.Print "Cell " & pAddress & " has been cursed."
  End Sub
  
  ' Class: RangeGroup (Class Module)
  Implements IGridComponent
  Private pChildren As Collection
  
  Private Sub Class_Initialize()
      Set pChildren = New Collection
  End Sub
  
  Public Sub Add(child As IGridComponent)
      pChildren.Add child
  End Sub
  
  Private Sub IGridComponent_Corrupt()
      Dim child As IGridComponent
      For Each child In pChildren
          child.Corrupt
      Next child
  End Sub
  
  ' Client
  Public Sub UnleashPlague()
      Dim c1 As New SingleCell: c1.Init "A1"
      Dim c2 As New SingleCell: c2.Init "A2"
      
      Dim rg As New RangeGroup
      rg.Add c1
      rg.Add c2
      
      ' Corrupting the group corrupts all children recursively
      rg.IGridComponent_Corrupt
  End Sub
tags: [vba, composite, structural, spreadsheet-necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Composite: The Fractal Hex

The Grid is inherently hierarchical: workbooks contain sheets, sheets contain ranges, ranges contain cells. The Composite pattern allows you to mirror this fractal reality within your code. 

By treating individual leaf nodes (`SingleCell`) and composite nodes (`RangeGroup`) identically via the `IGridComponent` interface, you can recursively apply spells across vast swaths of the spreadsheet. You need not know if you are cursing a single cell or an entire workbook; the recursive magic handles the traversal.
