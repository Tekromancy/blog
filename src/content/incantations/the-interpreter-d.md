---
title: Interpreter
description: Define a grammar for archaic draconic tongues and interpret them directly into execution logic.
type: d
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Linguistics"
formula: |2
  interface Expression { bool interpret(string context); }

  class RuneExpression : Expression {
      private string rune;
      this(string r) { rune = r; }
      override bool interpret(string context) {
          import std.string;
          return context.indexOf(rune) != -1;
      }
  }
tags: [behavioral, interpreter, dlang, parsing]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
Parse and evaluate raw magical intent at runtime.
