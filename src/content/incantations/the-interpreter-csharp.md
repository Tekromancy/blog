---
title: The Interpreter Sigils
description: Given a language, defining a representation for its grammar along with an interpreter.
type: csharp
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Rune Translation"
formula: |2
  using System;
  using System.Collections.Generic;

  namespace EnterpriseEvocation
  {
      public interface IExpression
      {
          bool Interpret(string context);
      }

      public class TerminalExpression : IExpression
      {
          private readonly string _data;
          public TerminalExpression(string data) => _data = data;

          public bool Interpret(string context) => context.Contains(_data);
      }

      public class OrExpression : IExpression
      {
          private readonly IExpression _expr1;
          private readonly IExpression _expr2;

          public OrExpression(IExpression expr1, IExpression expr2)
          {
              _expr1 = expr1;
              _expr2 = expr2;
          }

          public bool Interpret(string context) => _expr1.Interpret(context) || _expr2.Interpret(context);
      }
  }
tags: [behavioral, interpreter, parsing, csharp]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
When parsing ancient dead languages, an enterprise system must establish a domain-specific grammar. The Interpreter maps semantic meaning to abstract syntax trees of terminal and non-terminal nodes.
