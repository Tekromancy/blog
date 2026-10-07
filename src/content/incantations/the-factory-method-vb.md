---
title: The Factory Method of Late Binding
description: Deferring instantiation to subclasses through the dark art of CreateObject.
type: vb
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Binding"
formula: |2
  ' Creator.cls
  Public Function FactoryMethod() As Object
      ' To be overridden by the implementor
      Set FactoryMethod = Nothing
  End Function

  Public Sub Animate()
      Dim obj As Object
      Set obj = FactoryMethod()
      If Not obj Is Nothing Then
          obj.ExecuteDarkRitual
      End If
  End Sub

  ' ConcreteCreator.cls
  Implements Creator

  Private Function Creator_FactoryMethod() As Object
      On Error Resume Next
      Dim progID As String
      progID = "Excel.Application" ' A common source of torment
      Set Creator_FactoryMethod = CreateObject(progID)
  End Function
tags: [factory-method, late-binding, com]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Using Late Binding and `CreateObject`, the Factory Method invokes processes without needing compile-time references, avoiding the dreaded DLL Hell by dancing blindly in the dark.
