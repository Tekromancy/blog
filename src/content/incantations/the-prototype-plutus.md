---
title: "The Prototype of Datum Cloning"
description: "Cloning complex UTxO states (Datums) with minimal arcane mutation."
type: plutus
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // State Cloning"
formula: |2
  module LedgerMonad.Prototype where
  
  import PlutusTx.Prelude
  import Plutus.V2.Ledger.Api
  
  -- The Complex Arcane Entity
  data GolemState = GolemState
      { gCoreMana    :: Integer
      , gRunes       :: [BuiltinByteString]
      , gMaster      :: PubKeyHash
      , gIsAwake     :: Bool
      }
  
  {-# INLINABLE cloneGolem #-}
  -- The Illusionist's Trick (Record Update)
  -- In functional realms, prototype cloning is built-in via record updates.
  -- We clone the entity, only mutating the specific attributes we wish to change.
  cloneGolem :: GolemState -> Integer -> GolemState
  cloneGolem prototype newMana = prototype { gCoreMana = newMana, gIsAwake = True }
  
  {-# INLINABLE validateCloningRitual #-}
  validateCloningRitual :: GolemState -> GolemState -> ScriptContext -> Bool
  validateCloningRitual inputDatum outputDatum ctx =
      let cloned = cloneGolem inputDatum (gCoreMana outputDatum)
      in traceIfFalse "Imperfect illusion!" (outputDatum == cloned)
tags: [prototype, plutus, illusion]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Prototype pattern in a pure functional environment like Plutus requires no complex memory manipulation or interface dispatch. The Illusionist achieves this via Haskell's native record update syntax, efficiently duplicating the Datum of a consumed UTxO while substituting only the required fields for the continuing output.
