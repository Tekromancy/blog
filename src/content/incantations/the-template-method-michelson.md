---
title: "The Template Method Pattern in Michelson"
description: "Defining the invariant skeletal structure of an on-chain transaction workflow."
type: michelson
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Enchantment // Stackmancy"
formula: |2
  parameter (int %process);
  storage int;
  code {
    UNPAIR;
    # Template Step 1: Immutable Pre-condition
    DUP;
    PUSH int 0;
    COMPARE; GT;
    IF {} { PUSH string "TemplateError: Input must be strictly positive"; FAILWITH; };
    
    # Template Step 2: Variable Computation (the "hole" filled by subclasses)
    # In Michelson, we hardcode the specific variant's logic here
    PUSH int 42;
    ADD;
    
    # Template Step 3: Immutable State Finalization
    SWAP; DROP;
    NIL operation; PAIR
  }
tags: [behavioral, template-method, stack-based smart contracts, michelson, tezos]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
