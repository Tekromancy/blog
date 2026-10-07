---
title: Interpreter of the Syntax Void
description: Evaluate domain-specific search expressions against graph context.
type: hack
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Linguistic Parsing"
formula: |2
  <?hh // strict
  namespace SocialGraphAlchemy\Interpreter;

  interface IQueryExpression {
    public function interpret(string $context): bool;
  }

  class TerminalExpression implements IQueryExpression {
    public function __construct(private string $data) {}
    
    public function interpret(string $context): bool {
      return \HH\Lib\Str\contains($context, $this->data);
    }
  }

  class OrExpression implements IQueryExpression {
    public function __construct(
      private IQueryExpression $expr1, 
      private IQueryExpression $expr2
    ) {}

    public function interpret(string $context): bool {
      return $this->expr1->interpret($context) || $this->expr2->interpret($context);
    }
  }
tags: [hack, interpreter, behavioral, social-graph]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

### Translating the Whispers

Querying raw telemetry often involves bespoke, constantly shifting syntaxes. The **Interpreter** pattern is employed by Archmages to design an abstract syntax tree of expressions (`TerminalExpression`, `OrExpression`) capable of dynamically parsing complex logical statements.

When deployed against a stream of context data, the interpreter evaluates the grammar and yields truth—an invaluable tool when sifting the void for specific semantic markers.
