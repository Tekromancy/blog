---
title: The Interpreter Lexicon
description: Parse and evaluate raw, ancient runic text into executable syntax trees.
type: scala
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Linguistics"
formula: |2
  sealed trait Expression {
    def interpret(context: Map[String, Int]): Int
  }

  case class Rune(name: String) extends Expression {
    def interpret(context: Map[String, Int]): Int = context.getOrElse(name, 0)
  }

  case class Combine(left: Expression, right: Expression) extends Expression {
    def interpret(context: Map[String, Int]): Int = 
      left.interpret(context) + right.interpret(context)
  }

  // Usage:
  // val phrase = Combine(Rune("Ignis"), Rune("Terra"))
  // val power = phrase.interpret(Map("Ignis" -> 10, "Terra" -> 5))
tags: [scala, behavioral, linguistics, ast]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Using Algebraic Data Types (ADTs), the Interpreter pattern maps ancient runes to structured computation. Scala’s sealed traits are perfect for modeling arcane grammars.
