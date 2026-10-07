---
title: The Interpreter's Lexicon
description: Defining a grammar for a language and parsing its syntax.
type: graphql
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Evocation // Linguistics"
formula: |2
  # Defining an Abstract Syntax Tree (AST) within the Schema
  union Expression = Literal | Variable | Operation

  type Literal {
    value: Int!
  }

  type Variable {
    name: String!
  }

  type Operation {
    operator: OperatorEnum!
    left: Expression!
    right: Expression!
  }

  enum OperatorEnum {
    ADD
    SUBTRACT
    MULTIPLY
  }

  type Query {
    # The Oracle interprets the nested expression structure
    evaluate(expression: Expression!): Int!
  }
tags: [graphql, behavioral, interpreter, ast, unions]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

While GraphQL itself is an interpreter of its query language, we can also model the Interpreter pattern *within* the schema using Unions and recursive types. This allows the client to send abstract syntax trees (ASTs) of custom magical languages for the Oracle to evaluate and execute.
