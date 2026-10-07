---
title: The Abstract Factory
description: Conjure families of related or dependent components without specifying their concrete IBM 360 manifestations.
type: pli
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Mainframe"
formula: |2
  /* The Abstract Factory */
  ABSTRACT_FACTORY: PROC OPTIONS(MAIN);
     DCL 1 FACTORY BASED(F_PTR),
           2 CREATE_A ENTRY RETURNS(POINTER),
           2 CREATE_B ENTRY RETURNS(POINTER);
     DCL F_PTR POINTER;
     /* Punch card loaded */
     PUT SKIP LIST('IBM Arcana Initiated.');
  END ABSTRACT_FACTORY;
tags: [creation, factory, mainframe]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Abstract Factory allows mainframe monoliths to summon complete sets of related objects. When dealing with strict PL/I formatting, you define pointers to procedures representing the factory methods.
