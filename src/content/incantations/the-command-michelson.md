---
title: "The Command Pattern in Michelson"
description: "Encapsulating state mutations as explicit instructions that can be executed or reverted."
type: michelson
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Stackmancy"
formula: |2
  parameter (or (int %execute) (unit %undo));
  storage (pair int (list int)); # Current state, and history of previous states
  code {
    UNPAIR;
    IF_LEFT {
      # execute
      SWAP;
      UNPAIR;
      DUP; # Save current state
      DIG 3;
      ADD; # Apply command
      SWAP;
      DIG 2; CONS; # Push to history
      SWAP; PAIR;
      NIL operation; PAIR
    } {
      # undo
      DROP;
      UNPAIR;
      SWAP;
      IF_CONS {
        SWAP; DROP;
        SWAP; PAIR;
        NIL operation; PAIR
      } {
        PUSH string "CommandError: Nothing to undo"; FAILWITH;
      }
    }
  }
tags: [behavioral, command, stack-based smart contracts, michelson, tezos]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
