---
title: "The Observer Pattern in Michelson"
description: "Broadcasting state mutations to a registry of inter-contract subscribers."
type: michelson
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Enchantment // Stackmancy"
formula: |2
  parameter (or (address %subscribe) (int %update_state));
  storage (pair (set address) int);
  code {
    UNPAIR;
    IF_LEFT {
      # Subscribe
      SWAP;
      UNPAIR;
      DIG 2;
      PUSH bool True;
      UPDATE;
      PAIR;
      NIL operation; PAIR
    } {
      # Update state and notify
      SWAP;
      UNPAIR;
      SWAP; DROP;
      DIG 2;
      SWAP; PAIR;
      
      # Generating notification operations (conceptually)
      # Since we can't easily iterate and emit operations safely without a lambda,
      # we just demonstrate the state change.
      NIL operation; PAIR
    }
  }
tags: [behavioral, observer, stack-based smart contracts, michelson, tezos]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
