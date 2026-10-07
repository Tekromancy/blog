---
title: The Iterator of Collections
description: Traversing undocumented COM collections.
type: vb
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Traversal"
formula: |2
  ' Traversal.bas
  Public Sub TraverseCursedObjects(col As Collection)
      On Error Resume Next
      Dim it As Variant
      ' For Each implicitly uses IEnumVARIANT
      For Each it In col
          Debug.Print TypeName(it)
      Next it
  End Sub
tags: [iterator, collections, com]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Under the hood of every `For Each` loop lies the `IEnumVARIANT` interface. The Iterator pattern in VB6 harnesses this built-in magic to traverse collections of unstable COM objects gracefully.
