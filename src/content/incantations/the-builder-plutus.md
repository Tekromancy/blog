---
title: "The Builder of TxOut Transmutations"
description: "Incrementally composing complex Plutus transaction outputs via the State monad."
type: plutus
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Script Weaving"
formula: |2
  module LedgerMonad.Builder where
  
  import PlutusTx.Prelude
  import Plutus.V2.Ledger.Api
  import Plutus.V2.Ledger.Contexts
  
  -- The Arcane Crucible (Builder State)
  data TxBuilderState = TxBuilderState
      { bValue    :: Value
      , bDatum    :: Maybe Datum
      }
  
  {-# INLINABLE initialCrucible #-}
  initialCrucible :: TxBuilderState
  initialCrucible = TxBuilderState mempty Nothing
  
  -- The Transmuter's Tools (State-like composition without full Monad overhead on-chain)
  {-# INLINABLE addMana #-}
  addMana :: Value -> TxBuilderState -> TxBuilderState
  addMana v state = state { bValue = bValue state <> v }
  
  {-# INLINABLE inscribeRune #-}
  inscribeRune :: Datum -> TxBuilderState -> TxBuilderState
  inscribeRune d state = state { bDatum = Just d }
  
  {-# INLINABLE forgeOutput #-}
  forgeOutput :: TxBuilderState -> ValidatorHash -> TxOut
  forgeOutput state vh = TxOut 
      (Address (ScriptCredential vh) Nothing) 
      (bValue state) 
      (maybe NoOutputDatum OutputDatum (bDatum state))
      Nothing
  
  -- Weaving the Spell
  {-# INLINABLE executeWeave #-}
  executeWeave :: Value -> Datum -> ValidatorHash -> TxOut
  executeWeave mana rune vh = 
      forgeOutput (inscribeRune rune $ addMana mana initialCrucible) vh
tags: [builder, plutus, transmutation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Builder pattern in the Ledger Monad operates through stateful transmutation. Instead of assembling a monolithic `TxOut` artifact in a single chaotic burst of mana, the transmuter weaves it incrementally. By threading an arcane crucible (state record) through pure functions, we maintain elegance and safety before the final forge.
