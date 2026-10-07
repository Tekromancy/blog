---
title: "The State Pattern in Michelson"
description: "Altering smart contract behavior fundamentally when its internal phase shifts."
type: michelson
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Enchantment // Stackmancy"
formula: |2
  parameter (int %transition);
  storage (or (unit %state_dormant) (unit %state_active));
  code {
    UNPAIR;
    SWAP;
    IF_LEFT {
      # In Dormant State
      DROP;
      PUSH int 1;
      COMPARE; EQ;
      IF {
        # Transition to Active
        RIGHT unit;
        NIL operation; PAIR
      } {
        PUSH string "Invalid Transition from Dormant"; FAILWITH;
      }
    } {
      # In Active State
      DROP;
      PUSH int 0;
      COMPARE; EQ;
      IF {
        # Transition to Dormant
        LEFT unit;
        NIL operation; PAIR
      } {
        PUSH string "Invalid Transition from Active"; FAILWITH;
      }
    }
  }
tags: [behavioral, state, stack-based smart contracts, michelson, tezos]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
