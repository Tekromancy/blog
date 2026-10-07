---
title: The Memento of the PropertyBag
description: Saving an object's cursed state into a PropertyBag for later resurrection.
type: vb
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // State Preservation"
formula: |2
  ' StateSaver.cls
  Public Sub SaveState(obj As Object, pb As PropertyBag)
      On Error Resume Next
      pb.WriteProperty "CurseLevel", obj.CurseLevel
      pb.WriteProperty "DemonName", obj.DemonName
  End Sub

  Public Sub RestoreState(obj As Object, pb As PropertyBag)
      On Error Resume Next
      obj.CurseLevel = pb.ReadProperty("CurseLevel", 0)
      obj.DemonName = pb.ReadProperty("DemonName", "Unknown")
  End Sub
tags: [memento, propertybag, state]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The `PropertyBag` is VB6's built-in vessel for the Memento pattern. It allows you to siphon the state of an ActiveX control, persist it to disk, and load it later to restore the control to its former horrific glory.
