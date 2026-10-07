---
title: "The Factory Method Pattern in Michelson"
description: "Delegating the instantiation of arcane data structures to specialized entrypoints."
type: michelson
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Stackmancy"
formula: |2
  parameter (int %schema_id);
  storage (list string);
  code {
    UNPAIR;
    DUP;
    PUSH int 1;
    COMPARE; EQ;
    IF {
      DROP; PUSH string "Construct_Alpha";
    } {
      PUSH int 2;
      COMPARE; EQ;
      IF {
        PUSH string "Construct_Beta";
      } {
        PUSH string "Construct_Omega";
      }
    };
    CONS;
    NIL operation; PAIR
  }
tags: [creational, factory-method, stack-based smart contracts, michelson, tezos]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
