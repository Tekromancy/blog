---
title: The Chain of Responsibility Pattern in VBA
description: Route a dark request through a lineage of specialized daemons until one successfully processes it.
type: vba
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Divination // Spreadsheet Necromancy"
formula: |2
  ' Interface: IDataValidator (Class Module)
  Public Sub SetNext(nextValidator As IDataValidator)
  End Sub
  Public Function Validate(data As String) As Boolean
  End Function
  
  ' Class: BaseValidator (Class Module)
  Implements IDataValidator
  Protected pNext As IDataValidator ' VBA Note: Must be Public in actual VBA, used conceptually here
  
  Public Sub IDataValidator_SetNext(nextValidator As IDataValidator)
      Set pNext = nextValidator
  End Sub
  
  ' Class: NullValidator (Class Module)
  ' We implement the Base pattern manually in VBA
  Private pNext As IDataValidator
  
  Public Sub SetNext(nextValidator As IDataValidator)
      Set pNext = nextValidator
  End Sub
  
  Public Function Validate(data As String) As Boolean
      If data = "" Then
          Debug.Print "NullValidator: Found the void."
          Validate = False
      ElseIf Not pNext Is Nothing Then
          Validate = pNext.Validate(data)
      Else
          Validate = True
      End If
  End Function
tags: [vba, chain-of-responsibility, behavioral, spreadsheet-necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Chain of Responsibility: The Lineage of Daemons

When validating incoming data from external csv files, it may be subject to a dozen different corruption vectors. Using a single monolithic `If...ElseIf` block quickly devolves into an unreadable tangle of spaghetti code.

The Chain of Responsibility constructs a gauntlet. You link several validator objects together (`NullValidator`, `TypeValidator`, `RangeValidator`). A cell's value is passed to the first daemon. If it cannot handle the request (or if the data is valid and must pass to the next stage), it hands it down the chain. This decouples the sender from the ultimate receiver, allowing you to reconfigure the gauntlet at runtime.
