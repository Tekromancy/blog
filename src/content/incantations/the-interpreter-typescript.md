---
title: The Interpreter
description: Defining a grammatical representation to evaluate an arcane dialect.
type: typescript
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Linguistics"
formula: |2
  interface Expression {
    interpret(context: Map<string, number>): number;
  }
  
  class GlyphVariable implements Expression {
    constructor(private name: string) {}
    interpret(context: Map<string, number>): number {
      return context.get(this.name) || 0;
    }
  }
  
  class AdditiveResonance implements Expression {
    constructor(private left: Expression, private right: Expression) {}
    interpret(context: Map<string, number>): number {
      return this.left.interpret(context) + this.right.interpret(context);
    }
  }
tags: [behavioral, typescript, interpreter]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The Interpreter pattern defines a representation for its grammar along with an interpreter to evaluate sentences. In our realm, it allows mages to parse strings of ancient glyphs into actionable computations, dynamically resolving magical variables at runtime through strict type evaluation.
