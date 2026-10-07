---
title: The Interpreter
description: Evaluate a grammar of ancient celestial logic.
type: python
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: Divination // Linguistics
formula: |
  from abc import ABC, abstractmethod

  class Expression(ABC):
      @abstractmethod
      def interpret(self, context: dict) -> bool: pass

  class RuneExpression(Expression):
      def __init__(self, rune: str):
          self.rune = rune
          
      def interpret(self, context: dict) -> bool:
          return context.get(self.rune, False)

  class AndExpression(Expression):
      def __init__(self, expr1: Expression, expr2: Expression):
          self.expr1 = expr1
          self.expr2 = expr2
          
      def interpret(self, context: dict) -> bool:
          return self.expr1.interpret(context) and self.expr2.interpret(context)

  class OrExpression(Expression):
      def __init__(self, expr1: Expression, expr2: Expression):
          self.expr1 = expr1
          self.expr2 = expr2
          
      def interpret(self, context: dict) -> bool:
          return self.expr1.interpret(context) or self.expr2.interpret(context)

  # ctx = {"Sun": True, "Moon": False}
  # celestial_rule = AndExpression(RuneExpression("Sun"), OrExpression(RuneExpression("Moon"), RuneExpression("Sun")))
  # print(celestial_rule.interpret(ctx))
tags: [behavioral, python, divination]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Interpreter transforms a domain-specific language—such as ancient celestial runic syntax—into an executable syntax tree. Diviners utilize this matrix to evaluate truth conditions across sprawling star charts, calculating the exact moment a prophecy evaluates to True.
