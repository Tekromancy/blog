---
title: "The Memento Pattern in Michelson"
description: "Capturing and restoring the intrinsic state of a contract without violating encapsulation."
type: michelson
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Enchantment // Stackmancy"
formula: |2
  parameter (or (int %update_state) (unit %restore));
  storage (pair int (option int)); # Current State and Memento
  code {
    UNPAIR;
    IF_LEFT {
      # update_state
      SWAP;
      UNPAIR;
      # Save current state as memento
      SOME;
      SWAP; DROP;
      DIG 2;
      PAIR;
      NIL operation; PAIR
    } {
      # restore
      DROP;
      UNPAIR;
      SWAP;
      IF_NONE {
        PUSH string "MementoError: No saved state"; FAILWITH;
      } {
        SWAP; DROP;
        DUP; SOME; # Re-save the memento just in case
        SWAP; PAIR;
        NIL operation; PAIR
      }
    }
  }
tags: [behavioral, memento, stack-based smart contracts, michelson, tezos]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
