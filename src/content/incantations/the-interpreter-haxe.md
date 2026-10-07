---
title: The Interpreter
description: Parsing custom runescapes into executable logic
type: haxe
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Symbology"
formula: |2
  interface IExpression {
      public function interpret(context:Map<String, Int>):Int;
  }

  class NumberExpression implements IExpression {
      private var value:Int;
      public function new(value:Int) { this.value = value; }
      public function interpret(context:Map<String, Int>):Int { return value; }
  }

  class VariableExpression implements IExpression {
      private var name:String;
      public function new(name:String) { this.name = name; }
      public function interpret(context:Map<String, Int>):Int {
          return context.exists(name) ? context.get(name) : 0;
      }
  }

  class AddExpression implements IExpression {
      private var left:IExpression;
      private var right:IExpression;
      public function new(left:IExpression, right:IExpression) {
          this.left = left;
          this.right = right;
      }
      public function interpret(context:Map<String, Int>):Int {
          return left.interpret(context) + right.interpret(context);
      }
  }
tags: [divination, interpreter, haxe]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The Interpreter translates abstract syntactical runes into machine-executable actions. In advanced Haxe systems, leveraging macros alongside interpreters allows true metaprogramming. This pattern builds the core syntax tree for custom DSLs mapping magical phenomena.
