---
title: The Prototype of Memory Cloning
description: Replicating ActiveX controls using horrifying serialization tricks.
type: vb
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Necromancy // Cloning"
formula: |2
  ' ICloneable.cls
  Public Function Clone() As Object
  End Function

  ' ZombieControl.cls
  Implements ICloneable
  Public CurseLevel As Integer

  Private Function ICloneable_Clone() As Object
      Dim cloneObj As ZombieControl
      Set cloneObj = New ZombieControl

      cloneObj.CurseLevel = Me.CurseLevel
      ' Shallow copy the curse
      Set ICloneable_Clone = cloneObj
  End Function
tags: [prototype, clone, activex]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
When the cost of instantiating an ActiveX control tears at the fabric of system resources, the Prototype allows an Adept to rip a copy directly from memory, carrying over its state and its curses.
