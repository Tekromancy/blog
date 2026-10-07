---
title: The Eldritch Lexicon
description: Define a grammar and parse raw magical syntax into executable concepts.
type: dart
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Linguistics"
formula: |2
  abstract class Expression {
    bool interpret(String context);
  }

  class TerminalExpression implements Expression {
    final String _data;
    TerminalExpression(this._data);

    @override
    bool interpret(String context) => context.contains(_data);
  }

  class OrExpression implements Expression {
    final Expression _expr1;
    final Expression _expr2;

    OrExpression(this._expr1, this._expr2);

    @override
    bool interpret(String context) {
      return _expr1.interpret(context) || _expr2.interpret(context);
    }
  }

  void main() {
    final isFire = TerminalExpression('fire');
    final isFlame = TerminalExpression('flame');
    final fireMagic = OrExpression(isFire, isFlame);

    print(fireMagic.interpret('cast flame bolt')); // true
    print(fireMagic.interpret('cast frost shard')); // false
  }
tags: [dart, interpreter, parsing, divination]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

When raw, unformatted eldritch strings enter your system, you must divine their meaning. The Interpreter translates unstructured chaotic text into structured magical expressions, parsing syntax trees that the rest of your application can safely digest.
