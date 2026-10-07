---
title: The Abstract Factory Incantation in Simula
description: Conjuring entire families of ancient simulation entities through a singular primal source.
type: simula
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Genesis"
formula: |2
  Begin
      Class AbstractFactory;
      Virtual: Procedure CreateProductA, CreateProductB;
      Begin
      End;

      AbstractFactory Class ConcreteFactory1;
      Begin
          Procedure CreateProductA;
          Begin
              OutText("ProductA1 conjured."); OutImage;
          End;
          Procedure CreateProductB;
          Begin
              OutText("ProductB1 conjured."); OutImage;
          End;
      End;
  End;
tags: [simula, gof, creational, genesis]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In the ancient times of Simula 67, the First Objects were forged not individually, but in harmonious families. The Abstract Factory acts as a grand architect, breathing life into related simulated entities without binding the conjurer to their earthly classes.
