---
title: The Memento Phylactery
description: Capturing and externalizing an object's internal state so it can be restored later.
type: csharp
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Necromancy // State Preservation"
formula: |2
  using System;

  namespace EnterpriseEvocation
  {
      public class LichStateMemento
      {
          public int Health { get; }
          public int Mana { get; }
          public LichStateMemento(int health, int mana)
          {
              Health = health;
              Mana = mana;
          }
      }

      public class Lich
      {
          private int _health = 100;
          private int _mana = 500;

          public void TakeDamage(int dmg) => _health -= dmg;

          public LichStateMemento SaveToPhylactery()
          {
              Console.WriteLine("Saving state to Phylactery...");
              return new LichStateMemento(_health, _mana);
          }

          public void RestoreFromPhylactery(LichStateMemento memento)
          {
              _health = memento.Health;
              _mana = memento.Mana;
              Console.WriteLine($"Restored! Health: {_health}, Mana: {_mana}");
          }
      }
  }
tags: [behavioral, memento, state, csharp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
When destruction is imminent, the smart necromancer saves their internal state securely to a Memento (the phylactery). This opaque snapshot allows perfect restoration without violating encapsulation.
