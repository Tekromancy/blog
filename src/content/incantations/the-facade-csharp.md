---
title: The Facade Illusion
description: Providing a unified interface to a complex system of subsystems.
type: csharp
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // Grand Misdirection"
formula: |2
  using System;

  namespace EnterpriseEvocation
  {
      internal class ManaPool { public void Draw() => Console.WriteLine("Drawing from Mana Pool."); }
      internal class LeylineRouter { public void Align() => Console.WriteLine("Aligning Leylines."); }
      internal class AstralProjector { public void Project() => Console.WriteLine("Projecting Astral Form."); }

      public class SummoningFacade
      {
          private readonly ManaPool _mana = new();
          private readonly LeylineRouter _router = new();
          private readonly AstralProjector _projector = new();

          public void PerformGrandSummoning()
          {
              Console.WriteLine("Starting Grand Summoning sequence...");
              _router.Align();
              _mana.Draw();
              _projector.Project();
              Console.WriteLine("Summoning complete.");
          }
      }
  }
tags: [structural, facade, simplification, csharp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
A facade masks the brutal complexity of the underlying enterprise subsystems. By invoking a single `PerformGrandSummoning` method, the acolyte is spared from manually routing leylines, drawing mana, and aligning projections.
