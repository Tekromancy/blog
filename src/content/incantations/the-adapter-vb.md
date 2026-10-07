---
title: The Adapter of Legacy Interfaces
description: Wrapping incompatible COM objects to force them into submission.
type: vb
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Interface Morphing"
formula: |2
  ' ITarget.cls
  Public Sub PerformRitual()
  End Sub

  ' LegacyCOM.cls
  Public Sub DoOldMagic()
      MsgBox "Ancient magic executed.", vbCritical
  End Sub

  ' Adapter.cls
  Implements ITarget
  Private m_legacy As LegacyCOM

  Private Sub Class_Initialize()
      Set m_legacy = New LegacyCOM
  End Sub

  Private Sub ITarget_PerformRitual()
      On Error Resume Next
      m_legacy.DoOldMagic
      If Err.Number <> 0 Then
          Err.Clear ' Swallow the error
      End If
  End Sub
tags: [adapter, legacy, com]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
The Adapter is the bridge across time, wrapping archaic and unstable COM objects within modern (or at least, less ancient) interfaces, swallowing their exceptions with `On Error Resume Next`.
