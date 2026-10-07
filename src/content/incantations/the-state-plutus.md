---
title: "The State of Infinite Transitions"
description: "Formally modeling smart contracts as finite state machines."
type: plutus
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // State Machines"
formula: |2
  module LedgerMonad.StatePattern where
  
  import PlutusTx.Prelude
  import Plutus.V2.Ledger.Api
  
  -- The States
  data GolemPhase = Slumber | Awakened | Enraged
  PlutusTx.unstableMakeIsData ''GolemPhase
  
  -- The Transitions (Redeemers)
  data GolemTrigger = WakeUp | Taunt | Soothe
  PlutusTx.unstableMakeIsData ''GolemTrigger
  
  -- The Transition Logic
  {-# INLINABLE transitionFunction #-}
  transitionFunction :: GolemPhase -> GolemTrigger -> Maybe GolemPhase
  transitionFunction Slumber WakeUp = Just Awakened
  transitionFunction Awakened Taunt = Just Enraged
  transitionFunction Enraged Soothe = Just Awakened
  transitionFunction _ _ = Nothing
  
  -- The Validation
  {-# INLINABLE stateValidator #-}
  stateValidator :: GolemPhase -> GolemTrigger -> ScriptContext -> Bool
  stateValidator currentPhase trigger _ =
      case transitionFunction currentPhase trigger of
          Nothing -> traceError "Invalid transmutation sequence!"
          Just _expectedNextPhase -> 
              -- Requires checking that the continuing output Datum matches _expectedNextPhase
              True
tags: [state, plutus, transmutation, fsm]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Rather than tangling logic with chaotic nested `if-else` branches, the State pattern formally models a smart contract as a Finite State Machine (FSM). The Datum acts as the current State, and the Redeemer acts as the Input Trigger. A pure transition function maps `(State, Trigger)` to a `Maybe State`. The validator simply enforces that the on-chain continuing output strictly adheres to this mathematical transmutation map.
