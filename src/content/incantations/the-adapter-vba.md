---
title: The Adapter Pattern in VBA
description: Mutate an ancient interface to speak the modern dialect of the Spreadsheet Gods.
type: vba
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Spreadsheet Necromancy"
formula: |2
  ' Interface: IModernDataSource (Class Module)
  Public Function FetchData() As Variant
  End Function
  
  ' Class: LegacyDB (Class Module)
  ' This is an ancient, incompatible class
  Public Function GetRecordsetArray() As Variant
      ' Simulating legacy data retrieval
      Dim arr(1 To 2) As Variant
      arr(1) = "Old Soul"
      arr(2) = "Cursed Relic"
      GetRecordsetArray = arr
  End Function
  
  ' Class: DBAdapter (Class Module)
  Implements IModernDataSource
  Private pLegacyDb As LegacyDB
  
  Private Sub Class_Initialize()
      Set pLegacyDb = New LegacyDB
  End Sub
  
  Private Function IModernDataSource_FetchData() As Variant
      ' Adapting the legacy method to the new interface
      IModernDataSource_FetchData = pLegacyDb.GetRecordsetArray()
  End Function
  
  ' Client (Standard Module)
  Public Sub ConsumeData(source As IModernDataSource)
      Dim data As Variant
      data = source.FetchData()
      Debug.Print "Consumed: " & data(1)
  End Sub
tags: [vba, adapter, structural, spreadsheet-necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Adapter: The Babel Hex

When integrating ancient legacy macros with newly forged grimoires, incompatible interfaces will inevitably clash. The Adapter pattern acts as a dark translator, wrapping an old object and exposing a modern interface.

In Spreadsheet Necromancy, this often involves taking arcane ADODB recordsets or archaic flat file parsers and adapting them into a clean `IModernDataSource` interface that the rest of your modern application expects. The Adapter swallows the ugly syntax and spits out perfectly formatted arrays, protecting your main ritual from corruption.
