---
title: "The Observer of Oracle Pulses"
description: "Reacting to external data feeds via reference inputs."
type: plutus
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Oracle Watching"
formula: |2
  module LedgerMonad.Observer where
  
  import PlutusTx.Prelude
  import Plutus.V2.Ledger.Api
  import Plutus.V2.Ledger.Contexts
  
  -- The Subject's Sigil (Oracle NFT)
  type OracleToken = AssetClass
  
  {-# INLINABLE findOracleInput #-}
  findOracleInput :: OracleToken -> ScriptContext -> Maybe TxInInfo
  findOracleInput token ctx =
      let refInputs = txInfoReferenceInputs (scriptContextTxInfo ctx)
      in find (\i -> assetClassValueOf (txOutValue (txInInfoResolved i)) token == 1) refInputs
  
  -- The Observer Contract
  {-# INLINABLE observerValidator #-}
  observerValidator :: OracleToken -> Datum -> Redeemer -> ScriptContext -> Bool
  observerValidator oracleSigil _ _ ctx =
      case findOracleInput oracleSigil ctx of
          Nothing -> traceError "Oracle silent. Cannot proceed."
          Just _  -> 
              -- Extract oracle data and base the state transition upon it
              True
tags: [observer, plutus, divination, oracle]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Contracts isolated in the void cannot see the outside world. The Observer pattern binds a contract to an Oracle via CIP-31 Reference Inputs. The contract acts as the Observer, configured to only permit state transitions when a valid, updated Subject (the Oracle UTxO marked by a specific NFT) is present in the transaction's reference inputs. It passively watches the pulse of the blockchain.
