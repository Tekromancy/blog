---
title: The Template Method
description: Define the skeleton of an algorithm in an operation, deferring some steps to punch card subroutines.
type: pli
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Evocation // Skeleton"
formula: |2
  /* The Template Method */
  TEMPLATE: PROC OPTIONS(MAIN);
     DCL STEP_ONE ENTRY;
     DCL STEP_TWO ENTRY;

     RUN_ALGORITHM: PROC;
        PUT SKIP LIST('Starting standard algorithm skeleton...');
        CALL STEP_ONE();
        CALL STEP_TWO();
        PUT SKIP LIST('Algorithm complete.');
     END RUN_ALGORITHM;
  END TEMPLATE;
tags: [template, skeleton, algorithm]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Template Method establishes the overarching control flow while deferring specific implementations to function pointers or external procedures.
