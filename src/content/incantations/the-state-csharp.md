---
title: The State Metamorphosis
description: Allowing an object to alter its behavior when its internal state changes.
type: csharp
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Polymorphism"
formula: |2
  using System;

  namespace EnterpriseEvocation
  {
      public interface IShapeshifterState
      {
          void Attack();
      }

      public class HumanForm : IShapeshifterState
      {
          public void Attack() => Console.WriteLine("Attacks with a silver sword.");
      }

      public class WolfForm : IShapeshifterState
      {
          public void Attack() => Console.WriteLine("Rips and tears with feral claws.");
      }

      public class Druid
      {
          private IShapeshifterState _state = new HumanForm();

          public void Morph(IShapeshifterState newState)
          {
              Console.WriteLine($"Morphing...");
              _state = newState;
          }

          public void PerformAttack() => _state.Attack();
      }
  }
tags: [behavioral, state, fsm, csharp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
A druid's combat tactics change entirely based on their current physical form. By delegating the `Attack()` invocation to the internal state object, the class avoids massive `switch` blocks on an enum.
