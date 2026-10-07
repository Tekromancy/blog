---
title: The Prototype of Echoes
description: Cloning magical matrices using structural sharing and record updates in Roc.
type: roc
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Echomancy"
tags: [fast-functional-wards, roc, prototype, clone]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
formula: |2
  interface PrototypeEcho
      exposes [EchoMatrix, cloneAndMutate]
      imports []

  EchoMatrix : {
      resonance : U64,
      signature : Str,
      stability : F64
  }

  baseMatrix : EchoMatrix
  baseMatrix = { resonance: 100, signature: "Alpha", stability: 1.0 }

  # In Roc, cloning a prototype is as simple as updating a record
  cloneAndMutate : EchoMatrix, Str -> EchoMatrix
  cloneAndMutate = \prototype, newSignature ->
      { prototype & signature: newSignature }
---
