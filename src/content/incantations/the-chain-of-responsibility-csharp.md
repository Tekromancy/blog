---
title: The Chain of Responsibility Sequence
description: Passing requests along a chain of magical handlers.
type: csharp
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Divination // Escalation Protocols"
formula: |2
  using System;

  namespace EnterpriseEvocation
  {
      public class Hex
      {
          public int Severity { get; }
          public Hex(int severity) => Severity = severity;
      }

      public abstract class Dispeller
      {
          protected Dispeller Next;

          public void SetNext(Dispeller next) => Next = next;

          public abstract void Handle(Hex hex);
      }

      public class AcolyteDispeller : Dispeller
      {
          public override void Handle(Hex hex)
          {
              if (hex.Severity <= 10)
                  Console.WriteLine("Acolyte dispelled the minor hex.");
              else
                  Next?.Handle(hex);
          }
      }

      public class HighPriestDispeller : Dispeller
      {
          public override void Handle(Hex hex)
          {
              if (hex.Severity <= 50)
                  Console.WriteLine("High Priest dispelled the major curse.");
              else
                  Next?.Handle(hex);
          }
      }
  }
tags: [behavioral, chain-of-responsibility, csharp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
When a curse strikes the enterprise, the exact responder is often unknown. By establishing an escalation protocol, a minor acolyte attempts a dispel first; if the ward holds, the request gracefully falls through to the High Priest.
