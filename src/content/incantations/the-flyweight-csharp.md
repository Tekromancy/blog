---
title: The Flyweight Swarm
description: Sharing intrinsic state to support huge numbers of fine-grained objects efficiently.
type: csharp
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Necromancy // Swarm Optimization"
formula: |2
  using System;
  using System.Collections.Generic;

  namespace EnterpriseEvocation
  {
      public class SkeletonModel
      {
          public byte[] MeshData { get; } = new byte[10000]; 
          public string SharedTexture { get; } = "bone_diffuse.png";
      }

      public class SkeletonFlyweightFactory
      {
          private readonly Dictionary<string, SkeletonModel> _models = new();

          public SkeletonModel GetModel(string type)
          {
              if (!_models.ContainsKey(type))
              {
                  _models[type] = new SkeletonModel();
                  Console.WriteLine($"Cached new SkeletonModel for {type}.");
              }
              return _models[type];
          }
      }

      public class SkeletonUnit
      {
          private readonly SkeletonModel _model;
          public int X { get; set; }
          public int Y { get; set; }

          public SkeletonUnit(SkeletonModel model, int x, int y)
          {
              _model = model;
              X = x;
              Y = y;
          }

          public void Render() => Console.WriteLine($"Rendering skeleton at ({X}, {Y}) using shared texture {_model.SharedTexture}.");
      }
  }
tags: [structural, flyweight, optimization, csharp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
When raising legions of the undead, a naive necromancer will quickly exhaust the physical memory of their phylactery. The Flyweight Swarm optimizes this by caching intrinsic visual data and passing only extrinsic coordinates per unit.
