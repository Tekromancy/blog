---
title: The Visitor Astral Projection
description: Representing an operation to be performed on the elements of an object structure.
type: csharp
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Astral Inspection"
formula: |2
  using System;
  using System.Collections.Generic;

  namespace EnterpriseEvocation
  {
      public interface IArcaneVisitor
      {
          void Visit(Artifact artifact);
          void Visit(Scroll scroll);
      }

      public interface IElement
      {
          void Accept(IArcaneVisitor visitor);
      }

      public class Artifact : IElement
      {
          public string Name { get; } = "Cursed Blade";
          public void Accept(IArcaneVisitor visitor) => visitor.Visit(this);
      }

      public class Scroll : IElement
      {
          public string Spell { get; } = "Meteor Swarm";
          public void Accept(IArcaneVisitor visitor) => visitor.Visit(this);
      }

      public class AppraisalVisitor : IArcaneVisitor
      {
          public void Visit(Artifact artifact) => Console.WriteLine($"Appraising physical artifact: {artifact.Name}");
          public void Visit(Scroll scroll) => Console.WriteLine($"Appraising magical scroll: {scroll.Spell}");
      }
  }
tags: [behavioral, visitor, double-dispatch, csharp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
When parsing a complex AST of enterprise magical items, the Visitor pattern employs double-dispatch to cleanly separate the inspection logic from the items themselves. An astral projection can 'visit' nodes without mutating their core structure.
