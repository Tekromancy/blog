---
title: "The Mediator Pattern in Michelson"
description: "A central hub orchestrating complex message routing among interacting components."
type: michelson
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Stackmancy"
formula: |2
  parameter (pair (address %target) (int %message));
  storage (set address); # Registered components
  code {
    UNPAIR;
    UNPAIR;
    # Check if target is registered
    DUP;
    DIG 3;
    DUP;
    DIG 3;
    MEM;
    IF {} { PUSH string "MediatorError: Unregistered Target"; FAILWITH; };
    
    # Normally we would dispatch the message via an operation
    DROP; DROP; DROP;
    NIL operation; PAIR
  }
tags: [behavioral, mediator, stack-based smart contracts, michelson, tezos]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
