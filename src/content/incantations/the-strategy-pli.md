---
title: The Strategy
description: Define a family of algorithms, encapsulate each one, and make them interchangeable in the mainframe logic.
type: pli
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Algorithm"
formula: |2
  /* The Strategy */
  STRATEGY: PROC OPTIONS(MAIN);
     DCL 1 CONTEXT BASED(C_PTR),
           2 EXECUTE_STRATEGY ENTRY;
     PUT SKIP LIST('Executing dynamically selected sorting strategy...');
  END STRATEGY;
tags: [strategy, algorithm, dynamic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

By injecting function pointers into a Context structure, PL/I programs can alter their computational Strategy at runtime without recompiling.
