---
title: The Glyph Interpreter
description: Given a language, define a representation for its grammar along with an interpreter that uses it.
type: javascript
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Truenaming"
formula: |2
  class Expression { interpret(context) { return false; } }

  class TerminalExpression extends Expression {
    constructor(data) { super(); this.data = data; }
    interpret(context) { return context.includes(this.data); }
  }

  class OrExpression extends Expression {
    constructor(expr1, expr2) {
      super(); this.expr1 = expr1; this.expr2 = expr2;
    }
    interpret(context) {
      return this.expr1.interpret(context) || this.expr2.interpret(context);
    }
  }

  const fire = new TerminalExpression("Ignis");
  const flame = new TerminalExpression("Flamma");
  const fireSpell = new OrExpression(fire, flame);

  console.log(fireSpell.interpret("We invoke the Flamma!")); // true
  console.log(fireSpell.interpret("Summon the Aqua.")); // false
tags: [language, grammar, truenames]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

## The Glyph Interpreter

To speak the Truename of reality is to bend it. The Interpreter pattern decodes strings of ancient glyphs, mapping them to actionable semantic meaning within your magical engine.
