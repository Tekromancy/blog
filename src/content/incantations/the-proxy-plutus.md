---
title: "The Proxy of Authorization Tokens"
description: "Guarding access to a heavy validation contract through a lightweight proxy."
type: plutus
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Auth Tokens"
formula: |2
  module LedgerMonad.Proxy where
  
  import PlutusTx.Prelude
  import Plutus.V2.Ledger.Api
  import Plutus.V2.Ledger.Contexts
  
  -- The Warded Sigil
  type AuthToken = AssetClass
  
  {-# INLINABLE proxyValidator #-}
  proxyValidator :: AuthToken -> ValidatorHash -> Datum -> Redeemer -> ScriptContext -> Bool
  proxyValidator authSigil targetHash datum redeemer ctx =
      let info = scriptContextTxInfo ctx
          -- 1. Check for the Authorization Token (The Proxy Ward)
          hasAuth = assetClassValueOf (valueSpent info) authSigil > 0
          -- 2. Ensure execution continues to the heavy target contract
          forwardsToTarget = True -- Simplified check
      in traceIfFalse "Access denied: Missing Auth Sigil!" hasAuth
         && traceIfFalse "Did not forward to target!" forwardsToTarget
tags: [proxy, plutus, abjuration, auth-tokens]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

A Proxy validator serves as an Abjuration ward. Instead of embedding complex authorization logic into the core business contract, a lightweight Proxy script intercepts the transaction. It swiftly verifies the presence of an Authorization Token (a specialized NFT or native asset) in the inputs. If the sigil is present, it permits execution to flow to the heavy target contract; otherwise, the transaction violently fizzles.
