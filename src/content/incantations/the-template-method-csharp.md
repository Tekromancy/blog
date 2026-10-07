---
title: The Template Method Ritual
description: Defining the skeleton of an algorithm, deferring some steps to subclasses.
type: csharp
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Conjuration // Standardized Rites"
formula: |2
  using System;

  namespace EnterpriseEvocation
  {
      public abstract class SummoningRitual
      {
          public void PerformRitual()
          {
              DrawCircle();
              Chant();
              OfferSacrifice();
              BindEntity();
          }

          private void DrawCircle() => Console.WriteLine("Drawing the standard enterprise salt circle.");

          protected abstract void Chant();
          protected abstract void OfferSacrifice();

          private void BindEntity() => Console.WriteLine("Applying standardized demonic SLA bindings.");
      }

      public class ImpSummoning : SummoningRitual
      {
          protected override void Chant() => Console.WriteLine("Chanting low-tier abyssal gibberish.");
          protected override void OfferSacrifice() => Console.WriteLine("Offering a burnt piece of toast.");
      }
  }
tags: [behavioral, template-method, inheritance, csharp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Certain rites require a strict sequence to prevent catastrophe. The Template Method fixes the skeleton of the invocation—like drawing the circle and applying binding contracts—while allowing subclass rituals to define the specific chants and sacrifices.
