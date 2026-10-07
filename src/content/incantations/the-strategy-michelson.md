---
title: "The Strategy Pattern in Michelson"
description: "Injecting algorithmic paradigms dynamically into stack computations."
type: michelson
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Enchantment // Stackmancy"
formula: |2
  parameter (or (int %execute_strategy_alpha) (int %execute_strategy_omega));
  storage int;
  code {
    UNPAIR;
    IF_LEFT {
      # Strategy Alpha: Multiplicative Scaling
      PUSH int 2;
      MUL;
    } {
      # Strategy Omega: Additive Shift
      PUSH int 10;
      ADD;
    };
    SWAP; DROP;
    NIL operation; PAIR
  }
tags: [behavioral, strategy, stack-based smart contracts, michelson, tezos]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
