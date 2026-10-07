---
title: The Composite Incantation in Simula
description: Treating a tree of archaic artifacts as a single unified entity.
type: simula
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Conjuration // Hierarchy"
formula: |2
  Begin
      Class Component;
      Virtual: Procedure Operation;
      Begin
      End;

      Component Class Composite;
      Begin
          Procedure Operation;
          Begin
              ! Invoke Operation on all children;
          End;
      End;
  End;
tags: [simula, gof, structural, hierarchy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Through the Composite, a hierarchy of objects becomes a single tapestry. By treating individual leaves and branches uniformly, the conjurer manipulates profound structures with simple, unified commands.
