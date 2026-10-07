---
title: The Proxy Ward
description: Providing a surrogate or placeholder to control access to another object.
type: csharp
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Gatekeeping"
formula: |2
  using System;

  namespace EnterpriseEvocation
  {
      public interface IForbiddenTome
      {
          void ReadSecrets();
      }

      public class RealForbiddenTome : IForbiddenTome
      {
          public void ReadSecrets() => Console.WriteLine("Revealing sanity-shattering cosmic truths...");
      }

      public class TomeProxy : IForbiddenTome
      {
          private RealForbiddenTome _realTome;
          private readonly int _userClearanceLevel;

          public TomeProxy(int clearance)
          {
              _userClearanceLevel = clearance;
          }

          public void ReadSecrets()
          {
              if (_userClearanceLevel < 5)
              {
                  Console.WriteLine("Access Denied: Insufficient arcane clearance.");
                  return;
              }

              if (_realTome == null)
              {
                  Console.WriteLine("Materializing the Real Tome from the astral plane...");
                  _realTome = new RealForbiddenTome();
              }

              _realTome.ReadSecrets();
          }
      }
  }
tags: [structural, proxy, access-control, csharp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Proxy pattern erects an Abjuration Ward around expensive or dangerous enterprise assets. It ensures that only those with sufficient arcane clearance may instantiate and invoke the true underlying entity.
