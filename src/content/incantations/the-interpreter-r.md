---
title: "The Interpreter: Parsing the Glyphs"
description: "Defining a grammar for statistical queries."
type: "r"
gofPattern: "Interpreter"
gofCategory: "Behavioral"
arcaneSchool: "Divination // Grammar"
formula: |
  library(R6)

  # Abstract Expression
  Expression <- R6Class("Expression",
    public = list(
      interpret = function(context) stop("Not implemented")
    )
  )

  # Terminal Expression
  RuneExpression <- R6Class("RuneExpression", inherit = Expression,
    private = list(
      data = NULL
    ),
    public = list(
      initialize = function(data) {
        private$data <- data
      },
      interpret = function(context) {
        return(grepl(private$data, context))
      }
    )
  )

  # Non-terminal Expression
  OrExpression <- R6Class("OrExpression", inherit = Expression,
    private = list(
      expr1 = NULL,
      expr2 = NULL
    ),
    public = list(
      initialize = function(expr1, expr2) {
        private$expr1 <- expr1
        private$expr2 <- expr2
      },
      interpret = function(context) {
        return(private$expr1$interpret(context) || private$expr2$interpret(context))
      }
    )
  )
tags: ["R6", "Divination", "Behavioral", "Interpreter"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Interpreter translates esoteric grammar—such as combining queries of Runes and Glyphs—into true/false revelations within a given context string.
