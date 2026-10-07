---
title: "The Composite Pattern in Michelson"
description: "Processing hierarchical node structures and list accumulations on the Michelson stack."
type: michelson
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Transmutation // Stackmancy"
formula: |2
  parameter (list int);
  storage int;
  code {
    UNPAIR;
    # Iterate over the composite structure
    ITER {
      ADD;
    };
    NIL operation; PAIR
  }
tags: [structural, composite, stack-based smart contracts, michelson, tezos]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
