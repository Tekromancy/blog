---
title: The Observer of WithEvents
description: Listening to the screams of COM objects asynchronously.
type: vb
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Monitoring"
formula: |2
  ' EventWatcher.cls
  Private WithEvents m_cursed As CursedCOMObject

  Public Sub Watch(obj As CursedCOMObject)
      Set m_cursed = obj
  End Sub

  Private Sub m_cursed_OnSoulConsumed(ByVal soulID As String)
      Debug.Print "Soul " & soulID & " was consumed."
  End Sub
tags: [observer, withevents, events]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
The `WithEvents` keyword is the native realization of the Observer pattern. It binds your code to a COM object's event dispatch interface, allowing you to react synchronously when the object strikes.
