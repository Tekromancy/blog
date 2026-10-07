---
title: "The Bridge Pattern in Michelson"
description: "Decoupling abstraction from implementation across distinct smart contracts."
type: michelson
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Stackmancy"
formula: |2
  parameter (pair (int %payload) (address %implementation));
  storage unit;
  code {
    UNPAIR;
    UNPAIR;
    SWAP;
    # Obtain the contract interface for the implementation
    CONTRACT int;
    IF_NONE {
      PUSH string "BridgeError: Implementation not found";
      FAILWITH;
    } {};
    PUSH mutez 0;
    DIG 2;
    TRANSFER_TOKENS;
    # Accumulate operation
    NIL operation;
    SWAP; CONS;
    SWAP; PAIR
  }
tags: [structural, bridge, stack-based smart contracts, michelson, tezos]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
