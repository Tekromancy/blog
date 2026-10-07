---
title: The Interpreter
description: Given a language, define a representation for its grammar along with an interpreter that uses the representation to interpret sentences in the language.
type: go
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: Divination // Code-cracking
formula: |
  package interpreter

  import "strings"

  // Abstract Expression
  type Expression interface {
  	Interpret(context string) bool
  }

  // Terminal Expression
  type RuneExpression struct {
  	Rune string
  }
  func (r *RuneExpression) Interpret(context string) bool {
  	return strings.Contains(context, r.Rune)
  }

  // Non-Terminal Expression (OR)
  type OrExpression struct {
  	Expr1 Expression
  	Expr2 Expression
  }
  func (o *OrExpression) Interpret(context string) bool {
  	return o.Expr1.Interpret(context) || o.Expr2.Interpret(context)
  }

  // Non-Terminal Expression (AND)
  type AndExpression struct {
  	Expr1 Expression
  	Expr2 Expression
  }
  func (a *AndExpression) Interpret(context string) bool {
  	return a.Expr1.Interpret(context) && a.Expr2.Interpret(context)
  }
tags: [Behavioral, Divination, Go]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Interpreter
Elder dialects are rigid, operating on syntactic rules that break the minds of lesser coders. The Interpreter pattern constructs an Abstract Syntax Tree of the arcane tongue. By defining terminal runes and non-terminal logical combinations, a Diviner can parse alien transmissions and decrypt the underlying magical intent on the fly.
