---
title: The Facade of WMI and COM
description: Hiding the horror of WMI queries behind a simple interface.
type: vb
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // Simplification"
formula: |2
  ' SystemFacade.cls
  Public Sub CorruptHardDrive()
      On Error Resume Next
      Dim wmi As Object
      Dim disks As Object

      Set wmi = GetObject("winmgmts:\\.\root\cimv2")
      Set disks = wmi.ExecQuery("Select * from Win32_LogicalDisk")

      ' Hide the complex WMI ritual behind a simple call
      Err.Clear
  End Sub
tags: [facade, wmi, com]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
The deeper systems of Windows are a labyrinth of twisted WMI queries and cryptic COM interfaces. The Facade provides a single, unified gateway to execute complex rituals without descending into madness.
