---
title: The Decorator
description: Attach additional responsibilities to an old PL/I module dynamically.
type: pli
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Wrapper"
formula: |2
  /* The Decorator */
  DECORATOR: PROC OPTIONS(MAIN);
     DCL 1 COMPONENT BASED(C_PTR),
           2 OPERATION ENTRY;
     DCL WRAPPED_PTR POINTER;
     DECORATED_OP: PROC;
        PUT SKIP LIST('Pre-processing...');
        /* Call wrapped operation via pointer */
        PUT SKIP LIST('Post-processing...');
     END DECORATED_OP;
  END DECORATOR;
tags: [decorator, wrapper, dynamic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

By wrapping a pointer to an existing routine, PL/I programs can augment behavior without altering the monolithic source code.
