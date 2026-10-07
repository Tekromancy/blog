---
title: The Singleton Pattern in VBA
description: Bind a singular consciousness to the workbook, ensuring only one instance of the entity exists across the entire macro lifecycle.
type: vba
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Spreadsheet Necromancy"
formula: |2
  ' Standard Module: MGlobalGrimoire
  Private pInstance As CAppConfig
  
  Public Function AppConfig() As CAppConfig
      If pInstance Is Nothing Then
          Set pInstance = New CAppConfig
          pInstance.LoadDarkSecrets
      End If
      Set AppConfig = pInstance
  End Function
  
  ' Class: CAppConfig (Class Module)
  Public BasePath As String
  Public ConnectionString As String
  
  Public Sub LoadDarkSecrets()
      BasePath = "C:\Forbidden_Data\"
      ConnectionString = "Provider=SQLOLEDB;Data Source=ABYSS;"
  End Sub
  
  ' Client
  Public Sub TestSingleton()
      ' Access the single instance globally
      Debug.Print AppConfig.BasePath
  End Sub
tags: [vba, singleton, creational, spreadsheet-necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Singleton: The Monolith of State

The Singleton pattern in VBA is a tricky enchantment because VBA does not support static class properties. Instead, Spreadsheet Necromancers use a standard module to hold a private static reference to the class instance, exposing it via a public function.

This ensures that there is only one `CAppConfig` floating through the aether of your application. It acts as a monolith of state, an immutable source of truth that all macros consult before executing their dark commands. The Singleton is an anchor in the chaotic sea of the Grid.
