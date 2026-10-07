---
title: The Builder
description: Separate the construction of a complex punch card layout from its representation.
type: pli
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Mainframe"
formula: |2
  /* The Builder */
  BUILDER: PROC OPTIONS(MAIN);
     DCL 1 BUILD_STRUCT BASED(B_PTR),
           2 BUILD_PART_A ENTRY,
           2 BUILD_PART_B ENTRY,
           2 GET_RESULT ENTRY RETURNS(POINTER);
     DCL B_PTR POINTER;
     PUT SKIP LIST('Assembling strict formatted monolith...');
  END BUILDER;
tags: [builder, assembly, mainframe]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Through the Builder, the complex creation of PL/I structures is handled step-by-step, hiding the punch card layout intricacies.
