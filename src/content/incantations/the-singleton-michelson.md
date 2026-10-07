---
title: "The Singleton Pattern in Michelson"
description: "The immutable nature of the smart contract address itself forms the ultimate Singleton."
type: michelson
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Conjuration // Stackmancy"
formula: |2
  parameter unit;
  storage (pair (address %instance) (string %data));
  code {
    UNPAIR;
    DROP;
    # Ensure only the singular self-address is the recognized instance
    SELF_ADDRESS;
    UPDATE 1;
    NIL operation; PAIR
  }
tags: [creational, singleton, stack-based smart contracts, michelson, tezos]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
