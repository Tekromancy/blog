---
title: The Interpreter of the Lost Tongue
description: Define a grammatical representation for a forgotten arcane language and an interpreter to decipher it.
type: coldfusion
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Linguistics"
formula: |2
  interface name="IExpression" {
      public boolean interpret(string context);
  }

  component name="RuneExpression" implements="IExpression" {
      variables.rune = "";
      public RuneExpression function init(string r) { variables.rune = r; return this; }
      public boolean function interpret(string context) {
          return findNoCase(variables.rune, arguments.context) > 0;
      }
  }

  component name="AndExpression" implements="IExpression" {
      variables.expr1 = null;
      variables.expr2 = null;
      public AndExpression function init(IExpression e1, IExpression e2) {
          variables.expr1 = e1; variables.expr2 = e2; return this;
      }
      public boolean function interpret(string context) {
          return variables.expr1.interpret(arguments.context) && variables.expr2.interpret(arguments.context);
      }
  }
tags: [interpreter, coldfusion, lost-tongue, parsing]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

When delving into archaic CFML syntax from the old eras, the Interpreter parses strings of dead runes into actionable truth. By building an AST (Abstract Syntax Tree) of expressions, the server decodes the ancient tongue into boolean logic.
