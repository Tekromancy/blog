---
title: "The Factory Method Sigil"
description: "Delegating the exact instantiation of arcane subroutines to subclasses."
type: agda
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Phantasm"
formula: |2
  module FactoryMethod where
  
  open import Data.String
  
  record Creator (Product : Set) : Set where
    field
      factoryMethod : Product
      operate : Product → String
      
  -- The spell uses the factory method to obtain the product before operating.
  runCreator : {P : Set} → Creator P → String
  runCreator c = Creator.operate c (Creator.factoryMethod c)
tags: ["agda", "creational", "factory-method"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Factory Method

Sometimes, the overarching ritual is known, but the specific entity to summon must be determined by the local coven (or subclass). The **Factory Method** sets a template, leaving the precise summon up to the implementer.

## The Dependent Runes

Agda allows us to define the `Creator` record parameterized by the `Product` type, enforcing type-safe operations within the `operate` field while allowing flexibility in `factoryMethod`.
