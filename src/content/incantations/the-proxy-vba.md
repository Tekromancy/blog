---
title: The Proxy Pattern in VBA
description: Erect a phantom intermediary to defer the painful summoning of heavy objects until the very last moment.
type: vba
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Spreadsheet Necromancy"
formula: |2
  ' Interface: IDatabaseConnection (Class Module)
  Public Sub ExecuteQuery(sql As String)
  End Sub
  
  ' Class: HeavyDBConnection (Class Module)
  Implements IDatabaseConnection
  Private Sub Class_Initialize()
      ' Expensive initialization, opening ADODB connections over network
      Debug.Print "Establishing dark tether to the remote Abyss..."
  End Sub
  
  Private Sub IDatabaseConnection_ExecuteQuery(sql As String)
      Debug.Print "Executing: " & sql
  End Sub
  
  ' Class: DBConnectionProxy (Class Module)
  Implements IDatabaseConnection
  Private pRealConn As HeavyDBConnection
  
  Private Sub IDatabaseConnection_ExecuteQuery(sql As String)
      ' Lazy initialization
      If pRealConn Is Nothing Then
          Set pRealConn = New HeavyDBConnection
      End If
      pRealConn.ExecuteQuery sql
  End Sub
  
  ' Client
  Public Sub QueryData()
      Dim db As IDatabaseConnection
      Set db = New DBConnectionProxy
      
      ' The real connection is only summoned here
      db.ExecuteQuery "SELECT * FROM Souls"
  End Sub
tags: [vba, proxy, structural, spreadsheet-necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Proxy: The Phantom Sentinel

Some incantations—like connecting to a distant, decaying SQL server or opening a monolithic external workbook—are incredibly costly. If the user never actually requests data during their session, paying this cost upfront is a waste of vital essence.

The Proxy pattern provides a lightweight stand-in. It implements the exact same interface as the heavy object but defers its creation until a method is actually invoked. This lazy initialization acts as a phantom sentinel, guarding the execution thread from unnecessary delays and preserving application responsiveness.
