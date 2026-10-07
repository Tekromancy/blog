---
title: The Template Method Incantation in Simula
description: Defining the skeleton of a ritual and letting heirs flesh out the steps.
type: simula
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Necromancy // Skeleton"
formula: |2
  Begin
      Class AbstractClass;
      Virtual: Procedure PrimitiveOperation1, PrimitiveOperation2;
      Begin
          Procedure TemplateMethod;
          Begin
              PrimitiveOperation1;
              PrimitiveOperation2;
          End;
      End;
  End;
tags: [simula, gof, behavioral, skeleton]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Template Method lays down the unyielding spine of an algorithm. Subclasses provide the meat and blood, implementing specific esoteric steps while honoring the grand, unchanging structure of the rite.
