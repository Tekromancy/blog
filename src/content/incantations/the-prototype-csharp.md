---
title: The Prototype Clone
description: Perfect cellular duplication of existing magical entities.
type: csharp
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Biomancy // Cellular Duplication"
formula: |2
  using System;

  namespace EnterpriseEvocation
  {
      public interface ICloneableFamiliar
      {
          ICloneableFamiliar Clone();
      }

      public class RavenFamiliar : ICloneableFamiliar
      {
          public string Name { get; set; }
          public int Feathers { get; set; }

          public RavenFamiliar(string name, int feathers)
          {
              Name = name;
              Feathers = feathers;
          }

          public ICloneableFamiliar Clone()
          {
              return new RavenFamiliar(Name, Feathers);
          }

          public void Speak() => Console.WriteLine($"Nevermore, says {Name} with {Feathers} feathers.");
      }
  }
tags: [creational, prototype, cloning, csharp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
When manifesting a new entity is too costly in raw vis, the Prototype pattern offers a cheaper alternative: cloning an existing entity perfectly. Biomancers often employ this to duplicate familiars without performing the initial summoning rite again.
