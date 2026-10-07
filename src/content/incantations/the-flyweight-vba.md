---
title: The Flyweight Pattern in VBA
description: Minimize the memory footprint of massive armies by sharing the intrinsic state of your ethereal constructs.
type: vba
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Spreadsheet Necromancy"
formula: |2
  ' Class: SharedCellFormat (Class Module) - The Flyweight
  Public FontColor As Long
  Public BackgroundColor As Long
  
  Public Sub ApplyTo(target As Range)
      target.Font.Color = FontColor
      target.Interior.Color = BackgroundColor
  End Sub
  
  ' Class: FormatFactory (Class Module) - The Flyweight Factory
  Private pCache As Object
  
  Private Sub Class_Initialize()
      Set pCache = CreateObject("Scripting.Dictionary")
  End Sub
  
  Public Function GetFormat(key As String) As SharedCellFormat
      If Not pCache.Exists(key) Then
          Dim newFormat As New SharedCellFormat
          If key = "Cursed" Then
              newFormat.FontColor = RGB(255, 0, 0)
              newFormat.BackgroundColor = RGB(0, 0, 0)
          Else
              newFormat.FontColor = RGB(0, 0, 0)
              newFormat.BackgroundColor = RGB(255, 255, 255)
          End If
          pCache.Add key, newFormat
      End If
      Set GetFormat = pCache(key)
  End Function
  
  ' Client
  Public Sub PaintArmy()
      Dim factory As New FormatFactory
      Dim cursedFmt As SharedCellFormat
      Set cursedFmt = factory.GetFormat("Cursed")
      
      ' Apply the shared format to thousands of cells without duplicating the object
      cursedFmt.ApplyTo Sheet1.Range("A1")
      cursedFmt.ApplyTo Sheet1.Range("B2")
  End Sub
tags: [vba, flyweight, structural, spreadsheet-necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Flyweight: The Collective Unconscious

When raising an army of millions of rows, instantiating a full formatting object for each row will inevitably drain the available memory, crashing the Excel host in a spectacular out-of-memory death spiral. 

The Flyweight pattern mitigates this by sharing common, intrinsic data. Instead of each cell holding its own color values, they reference a shared `SharedCellFormat` object served by a `FormatFactory`. It binds the horde to a collective unconscious, drastically reducing the ritual's footprint and preventing catastrophic failure.
