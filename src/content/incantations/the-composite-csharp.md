---
title: The Composite Hierarchy
description: Treating individual spells and complex macro-spells uniformly.
type: csharp
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Illusion // Fractal Reality"
formula: |2
  using System;
  using System.Collections.Generic;

  namespace EnterpriseEvocation
  {
      public interface IMagicNode
      {
          void Execute();
      }

      public class SingleSpell : IMagicNode
      {
          private readonly string _incantation;
          public SingleSpell(string incantation) => _incantation = incantation;

          public void Execute() => Console.WriteLine($"Casting: {_incantation}");
      }

      public class MacroSpell : IMagicNode
      {
          private readonly List<IMagicNode> _nodes = new();
          private readonly string _macroName;

          public MacroSpell(string name) => _macroName = name;

          public void Add(IMagicNode node) => _nodes.Add(node);

          public void Execute()
          {
              Console.WriteLine($"Initiating Macro: {_macroName}");
              foreach (var node in _nodes)
              {
                  node.Execute();
              }
              Console.WriteLine($"Completed Macro: {_macroName}");
          }
      }
  }
tags: [structural, composite, tree, csharp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Fractal reality demands that complex orchestrations of magic be executable as if they were simple incantations. The Composite pattern builds a tree structure of magical nodes, enabling the caller to trigger a vast cascade of spells through a single `Execute()` invocation.
