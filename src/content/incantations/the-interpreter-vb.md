---
title: The Interpreter of VBScript
description: Parsing custom macros using the Microsoft Script Control.
type: vb
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Parsing"
formula: |2
  ' RitualParser.cls
  Private m_sc As Object

  Private Sub Class_Initialize()
      On Error Resume Next
      Set m_sc = CreateObject("MSScriptControl.ScriptControl")
      m_sc.Language = "VBScript"
  End Sub

  Public Function Interpret(expression As String) As String
      On Error Resume Next
      Interpret = m_sc.Eval(expression)
      If Err.Number <> 0 Then
          Interpret = "Syntax Error in the Grimoire"
          Err.Clear
      End If
  End Function
tags: [interpreter, vbscript, scriptcontrol]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Rather than writing a full abstract syntax tree parser in VB6, the Interpreter pattern is often bypassed by summoning the ancient MSScriptControl. Let the OLE gods parse the arcane syntax for you.
