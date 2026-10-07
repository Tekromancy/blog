---
title: "The Interpreter Pattern in Michelson"
description: "Parsing and evaluating an arcane DSL embedded directly within the blockchain."
type: michelson
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Enchantment // Stackmancy"
formula: |2
  parameter (list (or (int %push) (unit %add)));
  storage int;
  code {
    UNPAIR;
    # Start with an empty conceptual stack for the interpreter
    PUSH (list int) {};
    SWAP;
    ITER {
      IF_LEFT {
        CONS;
      } {
        DROP;
        IF_CONS {
          SWAP;
          IF_CONS {
            ADD;
            CONS;
          } { PUSH string "SyntaxError"; FAILWITH; }
        } { PUSH string "SyntaxError"; FAILWITH; }
      }
    };
    # Extract the result
    IF_CONS {
      SWAP; DROP;
    } { PUSH string "ExecutionError"; FAILWITH; };
    SWAP; DROP;
    NIL operation; PAIR
  }
tags: [behavioral, interpreter, stack-based smart contracts, michelson, tezos]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
