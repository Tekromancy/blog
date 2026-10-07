---
title: The Abstract Factory Pattern in VBA
description: Conjure families of related corporeal constructs within the gridded catacombs without specifying their concrete forms.
type: vba
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Spreadsheet Necromancy"
formula: |2
  ' Interface: IUndeadFactory (Class Module)
  Public Function CreateThrall() As IThrall
  End Function
  
  Public Function CreateAbomination() As IAbomination
  End Function
  
  ' Class: CorpseUndeadFactory (Class Module)
  Implements IUndeadFactory
  
  Private Function IUndeadFactory_CreateThrall() As IThrall
      Dim thrall As New CorpseThrall
      Set IUndeadFactory_CreateThrall = thrall
  End Function
  
  Private Function IUndeadFactory_CreateAbomination() As IAbomination
      Dim abom As New CorpseAbomination
      Set IUndeadFactory_CreateAbomination = abom
  End Function
  
  ' Client Code (Standard Module)
  Public Sub RaiseArmy()
      Dim factory As IUndeadFactory
      Set factory = New CorpseUndeadFactory
      
      Dim myThrall As IThrall
      Set myThrall = factory.CreateThrall()
      myThrall.HauntRange Sheet1.Range("A1:A10")
  End Sub
tags: [vba, abstract-factory, creational, spreadsheet-necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Abstract Factory: Cathedral of the Grid

In the dark arts of Spreadsheet Necromancy, the Abstract Factory is a monument to efficient resurrection. Instead of hard-coding the reanimation of a specific corpse into a specific cell, you create a factory that produces families of related entities—Thralls, Abominations, Specters—all conforming to the same unholy interface. 

The Grid demands structure. By abstracting the creation of your constructs, you ensure that if the Arch-Lich demands a switch from `Corpse` units to `Ethereal` units, you simply swap the factory instance. The ritual remains identical; only the medium of the spell changes.
