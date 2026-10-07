---
title: "The Abstract Factory Pattern in Michelson"
description: "A cyberpunk Michelson invocation for the Abstract Factory pattern."
type: michelson
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Stackmancy"
formula: |2
  parameter (or (unit %create_cyber_asset) (unit %create_neon_asset));
  storage (list string);
  code {
    UNPAIR;
    IF_LEFT {
      DROP;
      PUSH string "Cyber_Asset_X9";
    } {
      DROP;
      PUSH string "Neon_Asset_V2";
    };
    CONS;
    NIL operation;
    PAIR
  }
tags: [creational, abstract-factory, stack-based smart contracts, michelson, tezos]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
