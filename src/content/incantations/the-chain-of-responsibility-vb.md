---
title: The Chain of Responsibility for Error Handling
description: Passing exceptions through a gauntlet of "On Error" handlers.
type: vb
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Mitigation"
formula: |2
  ' IErrorHandler.cls
  Public Sub HandleError(errNum As Long, ByRef handled As Boolean)
  End Sub

  ' NextHandler.cls
  Public NextLink As IErrorHandler
  Implements IErrorHandler

  Private Sub IErrorHandler_HandleError(errNum As Long, ByRef handled As Boolean)
      If errNum = 429 Then ' ActiveX component can't create object
          MsgBox "Suppressed ActiveX failure."
          handled = True
      ElseIf Not NextLink Is Nothing Then
          NextLink.HandleError errNum, handled
      End If
  End Sub
tags: [chain-of-responsibility, error-handling, com]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
When an error ripples up the stack in VB6, the Chain of Responsibility provides a structured alternative to global `On Error Resume Next` by passing the cursed `Err.Number` through a linked list of guardians.
