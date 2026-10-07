---
title: "The Facade of TxInfo Masking"
description: "Providing a simplified, focused interface to the chaotic and massive ScriptContext."
type: plutus
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // TxInfo Masking"
formula: |2
  module LedgerMonad.Facade where
  
  import PlutusTx.Prelude
  import Plutus.V2.Ledger.Api
  import Plutus.V2.Ledger.Contexts
  
  -- The Facade: A simplified view of the complex TxInfo
  data SimplifiedTxContext = SimplifiedTxContext
      { stcSignatories :: [PubKeyHash]
      , stcValueMinted :: Value
      , stcValidRange  :: POSIXTimeRange
      }
  
  {-# INLINABLE createFacade #-}
  createFacade :: ScriptContext -> SimplifiedTxContext
  createFacade ctx =
      let info = scriptContextTxInfo ctx
      in SimplifiedTxContext
          { stcSignatories = txInfoSignatories info
          , stcValueMinted = txInfoMint info
          , stcValidRange  = txInfoValidRange info
          }
  
  -- The Illusionist's Core Logic
  {-# INLINABLE validateWithFacade #-}
  validateWithFacade :: Datum -> Redeemer -> ScriptContext -> Bool
  validateWithFacade _ _ ctx =
      let facade = createFacade ctx
      in traceIfFalse "Invalid illusion parameters!" (evaluateFacade facade)
  
  {-# INLINABLE evaluateFacade #-}
  evaluateFacade :: SimplifiedTxContext -> Bool
  evaluateFacade stc = length (stcSignatories stc) > 0
tags: [facade, plutus, illusion, context]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The `ScriptContext` is a vast, chaotic grimoire containing the entirety of a transaction's state. To prevent cognitive overload and execution bloat, the Illusionist constructs a Facade. This pattern extracts only the necessary fragments—such as signatories and minted value—into a focused data structure, allowing the core validation logic to operate swiftly and cleanly without unwrapping massive records repeatedly.
