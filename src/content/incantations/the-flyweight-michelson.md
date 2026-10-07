---
title: "The Flyweight Pattern in Michelson"
description: "Minimizing storage costs by sharing intrinsic contract state across multiple invocations."
type: michelson
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Stackmancy"
formula: |2
  parameter (pair int address);
  storage (map int string);
  code {
    UNPAIR;
    UNPAIR;
    DIG 2;
    DUP;
    DIG 3;
    GET;
    IF_NONE {
      PUSH string "FlyweightError: Intrinsic state uninitialized";
      FAILWITH;
    } {
      # Extrinsic state is the address, intrinsic state is the string from the map
      DROP; # Conceptually combining them
    };
    SWAP; DROP;
    NIL operation; PAIR
  }
tags: [structural, flyweight, stack-based smart contracts, michelson, tezos]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
