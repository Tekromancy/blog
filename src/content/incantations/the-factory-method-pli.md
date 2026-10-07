---
title: The Factory Method
description: Define an interface for creating a single IBM job, letting subclasses decide which concrete job to instantiate.
type: pli
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Mainframe"
formula: |2
  /* The Factory Method */
  FACTORY_METHOD: PROC OPTIONS(MAIN);
     DCL JOB_CREATOR ENTRY RETURNS(POINTER);
     PUT SKIP LIST('Allocating single job via factory...');
  END FACTORY_METHOD;
tags: [factory, instantiation, mainframe]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Factory Method defers instantiation, utilizing pointers to function entry points in PL/I to represent the polymorphic creation.
