---
title: "The Chain of Responsibility Pattern in Michelson"
description: "Routing a request through a hierarchy of on-chain handlers until one resolves it."
type: michelson
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Enchantment // Stackmancy"
formula: |2
  parameter (int %process_request);
  storage (list address);
  code {
    UNPAIR;
    # Check if this handler can process it
    DUP;
    PUSH int 100;
    COMPARE; LT;
    IF {
      # Processed
      DROP; DROP;
      NIL operation;
    } {
      # Pass to next in chain
      DROP;
      DUP;
      IF_CONS {
        SWAP; DROP;
        # In reality we would construct an operation to call this address
        DROP;
      } {
        PUSH string "ChainEnd: Unhandled Request"; FAILWITH;
      };
      NIL operation;
    };
    # Return empty storage conceptually
    PUSH (list address) {};
    SWAP; PAIR
  }
tags: [behavioral, chain-of-responsibility, stack-based smart contracts, michelson, tezos]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
