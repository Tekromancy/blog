---
title: The Observer Scrying
description: Defining a one-to-many dependency between objects.
type: csharp
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying Networks"
formula: |2
  using System;
  using System.Collections.Generic;

  namespace EnterpriseEvocation
  {
      public interface IScryer
      {
          void Update(string cosmicEvent);
      }

      public class Observatory
      {
          private readonly List<IScryer> _scryers = new();

          public void Attach(IScryer scryer) => _scryers.Add(scryer);

          public void CosmicShift(string @event)
          {
              Console.WriteLine($"Observatory detects: {@event}");
              foreach (var scryer in _scryers)
              {
                  scryer.Update(@event);
              }
          }
      }

      public class Astromancer : IScryer
      {
          public void Update(string cosmicEvent) => Console.WriteLine($"Astromancer notes the {cosmicEvent}.");
      }
  }
tags: [behavioral, observer, events, csharp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Instead of having every astromancer constantly poll the heavens, the Observatory simply notifies all registered IScryers when a cosmic shift occurs. In modern C#, this is often supplanted by native `event` delegates, but the pure interface Observer retains archaic elegance.
