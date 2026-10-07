---
title: "The Proxy: Guarding the Core"
description: "A surrogate that controls access to the main divination model."
type: "r"
gofPattern: "Proxy"
gofCategory: "Structural"
arcaneSchool: "Divination // Ward"
formula: |
  library(R6)

  # Subject Interface
  Oracle <- R6Class("Oracle",
    public = list(
      query = function() stop("Not implemented")
    )
  )

  # Real Subject
  TrueOracle <- R6Class("TrueOracle", inherit = Oracle,
    public = list(
      query = function() {
        "The true future reveals itself..."
      }
    )
  )

  # Proxy
  OracleProxy <- R6Class("OracleProxy", inherit = Oracle,
    private = list(
      true_oracle = NULL,
      credentials_valid = FALSE
    ),
    public = list(
      initialize = function(password) {
        if (password == "blood") {
          private$credentials_valid <- TRUE
        }
      },
      query = function() {
        if (private$credentials_valid) {
          if (is.null(private$true_oracle)) {
            private$true_oracle <- TrueOracle$new()
          }
          return(private$true_oracle$query())
        } else {
          return("Access Denied. You lack the proper wards.")
        }
      }
    )
  )
tags: ["R6", "Divination", "Structural", "Proxy"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Proxy defers initialization of the True Oracle until absolutely necessary, and enforces strict access control through arcane passwords.
