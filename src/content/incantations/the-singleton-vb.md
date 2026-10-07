---
title: The Singleton of the Global Address Space
description: Ensuring only one instance of a global COM object corrupts the memory.
type: vb
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Isolation"
formula: |2
  ' Module: ModSingleton.bas
  Private m_Instance As Object

  Public Function GetInstance() As Object
      On Error Resume Next
      If m_Instance Is Nothing Then
          ' A global anchor
          Set m_Instance = CreateObject("Scripting.FileSystemObject")
      End If
      Set GetInstance = m_Instance
  End Function
tags: [singleton, global, com]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
In the lawless lands of VB6, global modules are the easiest path to Singletons. This pattern restricts instantiation, ensuring that all threads gaze upon the exact same cursed file system object.
