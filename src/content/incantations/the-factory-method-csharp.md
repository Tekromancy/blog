---
title: The Factory Method Ritual
description: Delegate the instantiation of specific spells to subclass covens.
type: csharp
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Subclass Delegation"
formula: |2
  using System;

  namespace EnterpriseEvocation
  {
      public interface ISpell
      {
          void Cast();
      }

      public class Fireball : ISpell
      {
          public void Cast() => Console.WriteLine("A great sphere of fire bursts forth!");
      }

      public class IceLance : ISpell
      {
          public void Cast() => Console.WriteLine("A piercing shard of ice streaks through the air!");
      }

      public abstract class SpellWeaver
      {
          public abstract ISpell ForgeSpell();

          public void ChannelAndCast()
          {
              Console.WriteLine("Gathering mana...");
              var spell = ForgeSpell();
              spell.Cast();
          }
      }

      public class Pyromancer : SpellWeaver
      {
          public override ISpell ForgeSpell() => new Fireball();
      }

      public class Cryomancer : SpellWeaver
      {
          public override ISpell ForgeSpell() => new IceLance();
      }
  }
tags: [creational, factory-method, polymorphism, csharp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
By deferring the exact instantiation of a spell to specialized subclass covens, the Factory Method allows high-level channeling logic to remain pure and untainted by the specifics of elemental affinity.
