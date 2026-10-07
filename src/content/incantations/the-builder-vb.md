---
title: The Builder of Registry Keys
description: Constructing complex and cursed configurations step by step.
type: vb
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Conjuration // Architecture"
formula: |2
  ' IRegistryBuilder.cls
  Public Sub AddKey(key As String)
  End Sub

  Public Sub SetValue(val As String)
  End Sub

  Public Function GetResult() As Object
  End Function

  ' CursedBuilder.cls
  Implements IRegistryBuilder
  Private m_registry As Object

  Private Sub Class_Initialize()
      Set m_registry = CreateObject("WScript.Shell")
  End Sub

  Private Sub IRegistryBuilder_AddKey(key As String)
      On Error Resume Next
      ' Silence the screams of access denied
      m_registry.RegWrite key, "Cursed", "REG_SZ"
  End Sub

  Private Sub IRegistryBuilder_SetValue(val As String)
      ' Obfuscated magic
  End Sub

  Private Function IRegistryBuilder_GetResult() As Object
      Set IRegistryBuilder_GetResult = m_registry
  End Function
tags: [builder, registry, activex]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Constructing a registry manifestation is perilous. The Builder pattern separates the construction of these dark entries from their execution, masking the horrific runtime errors behind an elegant interface.
