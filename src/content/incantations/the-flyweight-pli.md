---
title: The Flyweight
description: Use sharing to support large numbers of fine-grained punch card data records efficiently.
type: pli
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Conjuration // Efficiency"
formula: |2
  /* The Flyweight */
  FLYWEIGHT: PROC OPTIONS(MAIN);
     DCL 1 SHARED_DATA BASED(S_PTR),
           2 INTRINSIC_STATE CHAR(10);
     DCL FLYWEIGHT_POOL(100) POINTER;
     PUT SKIP LIST('Sharing intrinsic mainframe states...');
  END FLYWEIGHT;
tags: [flyweight, sharing, efficiency]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Flyweight optimizes storage on older IBM systems by caching pointers to shared intrinsic state arrays instead of duplicating records.
