---
title: The Singleton
description: Ensure a mainframe resource pool has only one instance and provide a global point of access.
type: pli
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Monolith"
formula: |2
  /* The Singleton */
  SINGLETON: PROC OPTIONS(MAIN);
     DCL INSTANCE_PTR POINTER STATIC INITIAL(NULL());
     GET_INSTANCE: PROC RETURNS(POINTER);
        IF INSTANCE_PTR = NULL() THEN
           ALLOCATE RESOURCE SET(INSTANCE_PTR);
        RETURN (INSTANCE_PTR);
     END GET_INSTANCE;
     PUT SKIP LIST('Singleton accessed.');
  END SINGLETON;
tags: [singleton, static, monolith]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Singleton uses STATIC storage class in PL/I to ensure the pointer to the unique resource is retained across invocations.
