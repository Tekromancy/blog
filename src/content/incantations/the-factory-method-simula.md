---
title: The Factory Method Incantation in Simula
description: Delegating the act of creation to subclasses in the dawn of objects.
type: simula
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Genesis"
formula: |2
  Begin
      Class Creator;
      Virtual: Ref(Product) Procedure FactoryMethod;
      Begin
          Ref(Product) p;
          Procedure Operation;
          Begin
              p :- FactoryMethod;
          End;
      End;
  End;
tags: [simula, gof, creational, genesis]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Factory Method defers instantiation to the descendants. In the primordial object soup, a Creator defines the ritual, but allows its mystical heirs to decide the exact nature of the spawned entity.
