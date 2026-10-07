---
title: The Mediator Conduit
description: Defining an object that encapsulates how a set of objects interact.
type: csharp
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Centralized Harmony"
formula: |2
  using System;

  namespace EnterpriseEvocation
  {
      public interface IConduitMediator
      {
          void Notify(object sender, string @event);
      }

      public class LeylineGrid : IConduitMediator
      {
          public NodeA NodeA { get; set; }
          public NodeB NodeB { get; set; }

          public void Notify(object sender, string @event)
          {
              if (@event == "Surge")
              {
                  Console.WriteLine("LeylineGrid dampens surge, alerting NodeB.");
                  NodeB.Absorb();
              }
          }
      }

      public class NodeA
      {
          private readonly IConduitMediator _mediator;
          public NodeA(IConduitMediator mediator) => _mediator = mediator;

          public void Overload()
          {
              Console.WriteLine("NodeA is overloading!");
              _mediator.Notify(this, "Surge");
          }
      }

      public class NodeB
      {
          public void Absorb() => Console.WriteLine("NodeB safely absorbs the excess energy.");
      }
  }
tags: [behavioral, mediator, coordination, csharp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
In complex spell grids, allowing nodes to communicate directly results in a tangled mess of arcane short-circuits. The Mediator pattern centralizes communication via a master conduit.
