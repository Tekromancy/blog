---
title: "The Iterator Pattern in Michelson"
description: "Traversing immutable list collections iteratively through recursive smart contract calls."
type: michelson
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Stackmancy"
formula: |2
  parameter (unit %next);
  storage (pair (list int) (list int)); # Remaining items and Processed items
  code {
    DROP;
    UNPAIR;
    IF_CONS {
      # Element is on stack, remaining list is below
      # In this mock iterator, we just move it to processed
      DIG 2;
      SWAP;
      CONS;
      SWAP; PAIR;
      NIL operation; PAIR
    } {
      PUSH string "IteratorExhausted"; FAILWITH;
    }
  }
tags: [behavioral, iterator, stack-based smart contracts, michelson, tezos]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
