---
title: "The Abstract Factory of Ledger Monads"
description: "Conjuring families of related UTxO validators without specifying their concrete script addresses."
type: plutus
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Ledger Monad Conjuration"
formula: |2
  {-# INLINABLE mkAbstractValidatorFactory #-}
  module LedgerMonad.AbstractFactory where
  
  import PlutusTx.Prelude
  import Plutus.V2.Ledger.Api
  
  -- The Arcane Grimoire (Abstract Factory Interface)
  class IsLedgerFactory f where
      createDatum :: f -> Integer -> BuiltinData
      createRedeemer :: f -> BuiltinData
  
  -- The Concrete Spellbooks
  data PyromancyFactory = PyromancyFactory
  instance IsLedgerFactory PyromancyFactory where
      {-# INLINABLE createDatum #-}
      createDatum _ power = PlutusTx.toBuiltinData (power * 2)
      {-# INLINABLE createRedeemer #-}
      createRedeemer _ = PlutusTx.toBuiltinData (1 :: Integer)
  
  -- The Conjurer's Ritual
  {-# INLINABLE mkValidator #-}
  mkValidator :: IsLedgerFactory f => f -> BuiltinData -> BuiltinData -> ScriptContext -> Bool
  mkValidator factory datum redeemer ctx =
      let expectedRedeemer = createRedeemer factory
      in expectedRedeemer == redeemer
tags: [abstract-factory, plutus, conjuration]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In the depths of the Ledger Monad, the Abstract Factory acts as an arcane grimoire, defining a family of conjuration spells (Datum and Redeemer constructors) without binding the caster to a specific elemental school. By passing a concrete factory type, the validator polymorphs its expected state transitions.
