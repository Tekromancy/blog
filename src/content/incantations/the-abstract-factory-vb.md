---
title: The Abstract Factory of COM Transmutation
description: Forging families of cursed ActiveX controls through an arcane registry factory.
type: vb
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // COM Transmutation"
formula: |2
  ' IFactory.cls
  Public Function CreateCurses() As Object
  End Function

  Public Function CreateBlessings() As Object
  End Function

  ' ActiveXFactory.cls
  Implements IFactory

  Private Function IFactory_CreateCurses() As Object
      On Error Resume Next
      Set IFactory_CreateCurses = CreateObject("Arcane.DllHellCurse")
  End Function

  Private Function IFactory_CreateBlessings() As Object
      On Error Resume Next
      Set IFactory_CreateBlessings = CreateObject("Arcane.RegistryBlessing")
  End Function
tags: [activex, com, factory]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Abstract Factory binds families of ActiveX artifacts together, ensuring that when you dive into DLL Hell, you summon the appropriate registry keys and class IDs in tandem.
