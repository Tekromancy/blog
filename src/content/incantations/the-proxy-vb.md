---
title: The Proxy of Network Calls
description: Standing in for a distant DCOM server that may or may not exist.
type: vb
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Conjuration // Remote Evocation"
formula: |2
  ' IRemoteRitual.cls
  Public Sub Execute()
  End Sub

  ' DCOMProxy.cls
  Implements IRemoteRitual
  Private m_remoteObject As Object

  Private Sub IRemoteRitual_Execute()
      On Error Resume Next
      If m_remoteObject Is Nothing Then
          ' Attempt the dark art of remote instantiation
          Set m_remoteObject = CreateObject("Remote.Ritual", "\\CursedServer")
      End If

      If Not m_remoteObject Is Nothing Then
          m_remoteObject.Execute
      Else
          MsgBox "The remote server ignores your summons."
      End If
  End Sub
tags: [proxy, dcom, remote]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Proxy acts as an avatar for remote entities across the DCOM boundary. It controls access, defers expensive network instantiation, and silently swallows RPC server unavailable errors.
