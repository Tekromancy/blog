---
title: The Bridge
description: Decouple an abstraction from its implementation so that the two can vary independently on the mainframe.
type: pli
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Monolith"
formula: |2
  /* The Bridge */
  BRIDGE: PROC OPTIONS(MAIN);
     DCL 1 IMPLEMENTOR BASED(I_PTR),
           2 OP_IMPL ENTRY;
     DCL 1 ABSTRACTION BASED(A_PTR),
           2 IMPL_PTR POINTER,
           2 OPERATION ENTRY;
     PUT SKIP LIST('Bridging abstractions...');
  END BRIDGE;
tags: [bridge, pointer, implementation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Using pointers to structures that contain function pointers, PL/I can decouple the abstract job logic from the concrete hardware routines.
