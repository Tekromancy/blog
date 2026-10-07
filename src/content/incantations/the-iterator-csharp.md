---
title: The Iterator Journey
description: Providing a way to access elements of an aggregate object sequentially.
type: csharp
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Sequential Scrying"
formula: |2
  using System;
  using System.Collections;
  using System.Collections.Generic;

  namespace EnterpriseEvocation
  {
      public class SoulFragment
      {
          public string Memory { get; set; }
      }

      public class SoulStone : IEnumerable<SoulFragment>
      {
          private readonly List<SoulFragment> _fragments = new();

          public void Capture(SoulFragment fragment) => _fragments.Add(fragment);

          public IEnumerator<SoulFragment> GetEnumerator()
          {
              foreach (var f in _fragments)
              {
                  yield return f;
              }
          }

          IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
      }
  }
tags: [behavioral, iterator, ienumerable, csharp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Traversing the fragmented memories of a trapped spirit requires a sequential scrying technique. .NET's `IEnumerable` abstracts the painful memory traversal, providing a clean `yield return` iterator.
