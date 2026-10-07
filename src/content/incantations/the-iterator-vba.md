---
title: The Iterator Pattern in VBA
description: Traverse the abyssal depths of custom collections without exposing their internal, twisted architecture.
type: vba
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Spreadsheet Necromancy"
formula: |2
  ' Interface: IIterator (Class Module)
  Public Function HasNext() As Boolean
  End Function
  Public Function GetNext() As Variant
  End Function
  
  ' Class: GraveIterator (Class Module)
  Implements IIterator
  Private pCollection As Collection
  Private pIndex As Long
  
  Public Sub Init(col As Collection)
      Set pCollection = col
      pIndex = 1
  End Sub
  
  Private Function IIterator_HasNext() As Boolean
      IIterator_HasNext = (pIndex <= pCollection.Count)
  End Function
  
  Private Function IIterator_GetNext() As Variant
      IIterator_GetNext = pCollection(pIndex)
      pIndex = pIndex + 1
  End Function
  
  ' Client
  Public Sub WalkTheCatacombs()
      Dim tombs As New Collection
      tombs.Add "Tomb of the First Arch-Lich"
      tombs.Add "Crypt of the Unending Array"
      
      Dim iter As New GraveIterator
      iter.Init tombs
      
      Do While iter.HasNext()
          Debug.Print iter.GetNext()
      Loop
  End Sub
tags: [vba, iterator, behavioral, spreadsheet-necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Iterator: The Lantern of the Depths

While VBA has the `For Each` loop for standard arrays and collections, trying to implement it safely for highly complex, nested, or custom-built data structures (like a tree of cursed ranges) is notoriously difficult.

The Iterator pattern extracts the traversal logic into its own class. You create a `GraveIterator` that holds the current index and knows exactly how to navigate the specific horrors of the underlying collection. The client code simply asks `HasNext()` and `GetNext()`, remaining blissfully ignorant of the terrible data structures writhing beneath the surface.
