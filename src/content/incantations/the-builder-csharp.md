---
title: The Builder Evocation
description: Step-by-step construction of complex magical constructs via fluent interfaces.
type: csharp
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Construct Assembly"
formula: |2
  using System;
  using System.Collections.Generic;

  namespace EnterpriseEvocation
  {
      public class Golem
      {
          public string Core { get; set; } = string.Empty;
          public string Shell { get; set; } = string.Empty;
          public List<string> Runes { get; } = new();

          public void Activate() => Console.WriteLine($"Golem Active. Core: {Core}, Shell: {Shell}, Runes: {string.Join(", ", Runes)}");
      }

      public interface IGolemBuilder
      {
          IGolemBuilder SetCore(string coreType);
          IGolemBuilder SetShell(string shellMaterial);
          IGolemBuilder InscribeRune(string runeWord);
          Golem Awaken();
      }

      public class ObsidianGolemBuilder : IGolemBuilder
      {
          private Golem _golem = new();

          public IGolemBuilder SetCore(string coreType)
          {
              _golem.Core = coreType;
              return this;
          }

          public IGolemBuilder SetShell(string shellMaterial)
          {
              _golem.Shell = shellMaterial;
              return this;
          }

          public IGolemBuilder InscribeRune(string runeWord)
          {
              _golem.Runes.Add(runeWord);
              return this;
          }

          public Golem Awaken()
          {
              var result = _golem;
              _golem = new Golem();
              return result;
          }
      }
  }
tags: [creational, builder, fluent, csharp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Builder pattern allows for the methodical, step-by-step assembly of complex magical constructs. By utilizing fluent interfaces, the mage weaves intricate enchantments and solid forms into a cohesive whole before finally sparking life into the creation.
