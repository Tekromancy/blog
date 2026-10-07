---
title: "The Decorator Pattern in Michelson"
description: "Wrapping core state mutations with auxiliary security and fee extraction logic."
type: michelson
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Stackmancy"
formula: |2
  parameter int;
  storage int;
  code {
    UNPAIR;
    # Decorator Layer: Authorization Check
    SENDER;
    SOURCE;
    COMPARE; NEQ;
    IF { PUSH string "Unauthorized Access"; FAILWITH; } {};
    
    # Decorator Layer: Fee computation
    PUSH int 5;
    ADD;
    
    # Core Operation
    ADD;
    
    NIL operation; PAIR
  }
tags: [structural, decorator, stack-based smart contracts, michelson, tezos]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
