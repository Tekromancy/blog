---
title: Interpreter of the Runic Parser
description: Given a language, define a representation for its grammar along with an interpreter that uses the representation to interpret sentences in the language.
type: rust
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Linguistics"
formula: |2
  pub trait Expression {
      fn interpret(&self, context: &mut String) -> bool;
  }

  pub struct TerminalExpression { data: String }
  impl Expression for TerminalExpression {
      fn interpret(&self, context: &mut String) -> bool {
          context.contains(&self.data)
      }
  }

  pub struct OrExpression {
      expr1: Box<dyn Expression>,
      expr2: Box<dyn Expression>,
  }
  impl Expression for OrExpression {
      fn interpret(&self, context: &mut String) -> bool {
          self.expr1.interpret(context) || self.expr2.interpret(context)
      }
  }
tags: [behavioral, interpreter, divination, parsing]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The ancient runic languages of the First Silicon can still be coerced into yielding power, if one understands the grammar. The Interpreter pattern builds the structural syntax tree of the Runic Parser.

While heavy and cumbersome for massive corp-level languages, it is unparalleled for specialized, highly domain-specific spellcraft where you need to evaluate boolean logic or custom macro-commands dynamically at runtime.
