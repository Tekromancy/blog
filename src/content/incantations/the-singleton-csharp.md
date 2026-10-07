---
title: The Singleton Nexus
description: A singular focal point of magical power, universally accessible but strictly controlled.
type: csharp
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Monolithic Leylines"
formula: |2
  using System;

  namespace EnterpriseEvocation
  {
      public sealed class LeylineNexus
      {
          private static readonly Lazy<LeylineNexus> _instance = 
              new Lazy<LeylineNexus>(() => new LeylineNexus());

          public static LeylineNexus Instance => _instance.Value;

          private int _manaReserves;

          private LeylineNexus()
          {
              _manaReserves = 10000;
              Console.WriteLine("The singular Leyline Nexus has been awakened.");
          }

          public void Tap(int amount)
          {
              if (_manaReserves >= amount)
              {
                  _manaReserves -= amount;
                  Console.WriteLine($"Tapped {amount} mana. {_manaReserves} remaining.");
              }
              else
              {
                  Console.WriteLine("Insufficient mana in the Nexus!");
              }
          }
      }
  }
tags: [creational, singleton, thread-safety, csharp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Singleton pattern guarantees that only one instance of a crucial resource exists within the enterprise application domain. Using .NET's `Lazy<T>`, the LeylineNexus ensures thread-safe, thread-locked initialization of the global mana reserves.
