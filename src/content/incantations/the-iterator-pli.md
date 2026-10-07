---
title: The Iterator
description: Provide a way to access the elements of an aggregate mainframe structure sequentially without exposing its underlying representation.
type: pli
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Traversal"
formula: |2
  /* The Iterator */
  ITERATOR: PROC OPTIONS(MAIN);
     DCL 1 ITER BASED(I_PTR),
           2 HAS_NEXT ENTRY RETURNS(BIT(1)),
           2 GET_NEXT ENTRY RETURNS(POINTER);
     PUT SKIP LIST('Sequentially reading tape records...');
  END ITERATOR;
tags: [iterator, sequential, tape]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Iterator obscures the complexities of tape reading and array index tracking, exposing only simple fetch functions.
