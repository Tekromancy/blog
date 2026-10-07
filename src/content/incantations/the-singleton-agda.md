---
title: "The Singleton Singularity"
description: "Ensuring only one instance of an arcane artifact exists within the grid."
type: agda
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Dimensional Locking"
formula: |2
  module SingletonPattern where
  
  open import Data.Unit
  
  -- The grid itself is unique, represented by the Unit type.
  GridCore : Set
  GridCore = ⊤
  
  theOneCore : GridCore
  theOneCore = tt
tags: ["agda", "singleton", "cyber-magic"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Singleton Singularity

There is only one true World Tree routing protocol. The **Singleton Singularity** prevents grid collapse by restricting the instantiation of a class to exactly one object.

## The Dependent Runes

In functional realms, singletons are often just units (`⊤`), or heavily guarded environment values passed implicitly throughout the matrix. Agda's type checking guarantees there is exactly one inhabitant if designed carefully.
