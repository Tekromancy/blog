---
title: "The Adapter Pattern in Michelson"
description: "Translating off-chain alien data formats into compliant stack representations."
type: michelson
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Stackmancy"
formula: |2
  parameter (int %legacy_signal);
  storage (list nat);
  code {
    UNPAIR;
    # Adapter layer: Converts legacy int to nat, handling negatives
    ISNAT;
    IF_NONE {
      PUSH string "AdapterError: Signal must be non-negative";
      FAILWITH;
    } {
      CONS;
    };
    NIL operation; PAIR
  }
tags: [structural, adapter, stack-based smart contracts, michelson, tezos]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
