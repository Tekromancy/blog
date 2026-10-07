---
title: The Bridge Enchantment
description: Decoupling an abstraction from its implementation to vary them independently.
type: csharp
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Astral Separation"
formula: |2
  using System;

  namespace EnterpriseEvocation
  {
      public interface ISpellFocus
      {
          void Amplify();
      }

      public class CrystalFocus : ISpellFocus
      {
          public void Amplify() => Console.WriteLine("Amplifying with crystalline resonance.");
      }

      public class BoneFocus : ISpellFocus
      {
          public void Amplify() => Console.WriteLine("Amplifying with necrotic bone density.");
      }

      public abstract class Grimoire
      {
          protected ISpellFocus Focus;

          protected Grimoire(ISpellFocus focus)
          {
              Focus = focus;
          }

          public abstract void CastPage(int pageNumber);
      }

      public class EvocationGrimoire : Grimoire
      {
          public EvocationGrimoire(ISpellFocus focus) : base(focus) { }

          public override void CastPage(int pageNumber)
          {
              Console.WriteLine($"Reading destructive page {pageNumber}...");
              Focus.Amplify();
          }
      }
  }
tags: [structural, bridge, decoupling, csharp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Bridge pattern allows the Grimoire's structure to evolve separately from its underlying spell foci. By relying on composition over inheritance, a dark wizard avoids the combinatorial explosion of classes like `CrystalEvocationGrimoire` or `BoneIllusionGrimoire`.
