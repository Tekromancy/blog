---
title: The Bridge Incantation in Simula
description: Decoupling an ancient abstraction from its implementation.
type: simula
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Decoupling"
formula: |2
  Begin
      Class Implementor;
      Virtual: Procedure OperationImp;
      Begin
      End;

      Class Abstraction(imp); Ref(Implementor) imp;
      Begin
          Procedure Operation;
          Begin
              imp.OperationImp;
          End;
      End;
  End;
tags: [simula, gof, structural, decoupling]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Bridge severs the rigid earthly tether between an abstraction and its implementation, allowing both to evolve independently in the ether of the system.
