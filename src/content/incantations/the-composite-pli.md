---
title: The Composite
description: Compose data sets into tree structures to represent part-whole hierarchies in IBM Job Control.
type: pli
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Transmutation // Structure"
formula: |2
  /* The Composite */
  COMPOSITE: PROC OPTIONS(MAIN);
     DCL 1 COMPONENT BASED(C_PTR),
           2 TYPE CHAR(1), /* L for Leaf, C for Composite */
           2 OPERATION ENTRY,
           2 CHILDREN POINTER; /* Linked list of children */
     PUT SKIP LIST('Traversing the hierarchical Job Control structure...');
  END COMPOSITE;
tags: [composite, tree, hierarchy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The Composite requires manual linked list manipulation in PL/I to maintain tree structures of components.
