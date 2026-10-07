---
title: "The Prototype Pattern in Michelson"
description: "Duplicating existing state constructs directly on the stack."
type: michelson
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Conjuration // Stackmancy"
formula: |2
  parameter (unit %clone_prototype);
  storage (pair (string %prototype) (list string %clones));
  code {
    UNPAIR;
    DROP;
    UNPAIR;
    DUP; # The DUP instruction is the essence of Prototype in a stack machine
    DIG 2;
    SWAP; CONS;
    SWAP; PAIR;
    NIL operation; PAIR
  }
tags: [creational, prototype, stack-based smart contracts, michelson, tezos]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
