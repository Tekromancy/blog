---
title: The Flyweight of String Pointers
description: Sharing intrinsic state to conserve the fragile VB6 memory limits.
type: vb
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Memory Weaving"
formula: |2
  ' FlyweightFactory.cls
  Private m_pool As Collection

  Private Sub Class_Initialize()
      Set m_pool = New Collection
  End Sub

  Public Function GetCurse(key As String) As Object
      On Error Resume Next
      Dim obj As Object
      Set obj = m_pool.Item(key)
      If obj Is Nothing Then
          Set obj = CreateObject("Arcane.Curse")
          m_pool.Add obj, key
      End If
      Set GetCurse = obj
  End Function
tags: [flyweight, memory, optimization]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
When an army of ActiveX objects threatens to consume your 2GB user-mode memory limit, the Flyweight pattern intercedes. It pools and shares intrinsic states, weaving a tight tapestry of shared pointers.
