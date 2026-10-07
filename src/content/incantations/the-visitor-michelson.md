---
title: "The Visitor Pattern in Michelson"
description: "Traversing disparate data schemas on the stack and accumulating domain-specific results."
type: michelson
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Enchantment // Stackmancy"
formula: |2
  parameter (list (or (int %node_alpha) (int %node_omega)));
  storage int;
  code {
    UNPAIR;
    SWAP;
    # Iterating acts as the accept() method for the structure
    DIG 1;
    ITER {
      IF_LEFT {
        # Visit Node Alpha
        PUSH int 10;
        MUL;
      } {
        # Visit Node Omega
        PUSH int 5;
        ADD;
      };
      # Accumulate
      ADD;
    };
    NIL operation; PAIR
  }
tags: [behavioral, visitor, stack-based smart contracts, michelson, tezos]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
