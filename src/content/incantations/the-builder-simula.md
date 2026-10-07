---
title: The Builder Incantation in Simula
description: Step-by-step assembly of complex primal structures in the ancient simulation.
type: simula
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Assembly"
formula: |2
  Begin
      Class Builder;
      Virtual: Procedure BuildPartA, BuildPartB;
      Begin
      End;

      Builder Class ConcreteBuilder;
      Begin
          Procedure BuildPartA; OutText("Forging Part A... ");
          Procedure BuildPartB; OutText("Weaving Part B... ");
      End;
  End;
tags: [simula, gof, creational, assembly]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Step-by-step, the ancient structures were erected. The Builder incantation separates the construction of a complex genesis object from its representation, allowing the same archaic process to yield different manifestations.
