---
title: The Template Method Pattern in VBA
description: Define the skeleton of an ancient ritual, allowing lesser practitioners to customize specific steps without ruining the grand design.
type: vba
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Necromancy // Spreadsheet Necromancy"
formula: |2
  ' Abstract Class Simulation: BaseDataRitual (Class Module)
  ' VBA doesn't have abstract classes. We use a base class that expects an implementer.
  Private pImplementer As Object ' Must implement specific methods
  
  Public Sub Init(implementer As Object)
      Set pImplementer = implementer
  End Sub
  
  ' The Template Method
  Public Sub ExecuteRitual()
      Debug.Print "Step 1: Cleansing the summoning circle."
      
      ' Hook for subclass behavior
      pImplementer.ExtractData
      
      Debug.Print "Step 3: Sealing the dark portal."
  End Sub
  
  ' Class: CSVExtractor (Class Module)
  Public Sub ExtractData()
      Debug.Print "Step 2: Parsing the CSV of Souls."
  End Sub
  
  ' Class: SQLExtractor (Class Module)
  Public Sub ExtractData()
      Debug.Print "Step 2: Querying the Abyssal Database."
  End Sub
  
  ' Client
  Public Sub PerformSummoning()
      Dim baseRitual As New BaseDataRitual
      
      ' Configure with CSV behavior
      baseRitual.Init New CSVExtractor
      baseRitual.ExecuteRitual
  End Sub
tags: [vba, template-method, behavioral, spreadsheet-necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Template Method: The Skeleton Ritual

Certain dark operations, like importing data from external sources, follow a strict chronological sequence: open connection, extract data, format data, close connection. Modifying the sequence itself leads to catastrophic failure (like closing a connection before reading).

The Template Method defines the invariable skeleton of the algorithm in a base class (the `ExecuteRitual` method). The specific, variable steps (like `ExtractData`) are deferred to injected implementer objects. This ensures that the overarching structure of the ritual remains pristine, while still allowing for necessary variations in the underlying dark arts.
