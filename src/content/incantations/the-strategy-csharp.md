---
title: The Strategy Grimoire
description: Defining a family of algorithms, encapsulating each one, and making them interchangeable.
type: csharp
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Tactical Casting"
formula: |2
  using System;

  namespace EnterpriseEvocation
  {
      public interface ICombatStrategy
      {
          void Execute();
      }

      public class AggressiveStrategy : ICombatStrategy
      {
          public void Execute() => Console.WriteLine("Spamming highly destructive AoE fire magic!");
      }

      public class DefensiveStrategy : ICombatStrategy
      {
          public void Execute() => Console.WriteLine("Raising absolute zero ice barriers.");
      }

      public class Battlemage
      {
          private ICombatStrategy _strategy;

          public Battlemage(ICombatStrategy strategy)
          {
              _strategy = strategy;
          }

          public void SetTactics(ICombatStrategy strategy)
          {
              _strategy = strategy;
              Console.WriteLine("Swapping tactical loadout.");
          }

          public void Engage() => _strategy.Execute();
      }
  }
tags: [behavioral, strategy, composition, csharp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
A prepared Battlemage carries multiple combat strategies in their grimoire. Depending on the ebb and flow of enterprise battle, they swap their `ICombatStrategy` interface at runtime.
