---
title: "The Builder Pattern in Michelson"
description: "Constructing complex smart contract states step-by-step in Michelson."
type: michelson
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Conjuration // Stackmancy"
formula: |2
  parameter (or (string %add_component) (unit %finalize));
  storage (pair (list string) (option string));
  code {
    UNPAIR;
    IF_LEFT {
      # %add_component
      SWAP; UNPAIR;
      DIG 2; CONS;
      SWAP; PAIR;
      NIL operation; PAIR
    } {
      # %finalize
      DROP;
      UNPAIR;
      PUSH (option string) (Some "Finalized_Construct");
      SWAP; DROP;
      SWAP; PAIR;
      NIL operation; PAIR
    }
  }
tags: [creational, builder, stack-based smart contracts, michelson, tezos]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
