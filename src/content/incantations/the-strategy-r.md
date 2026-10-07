---
title: "The Strategy: Choosing the Ritual"
description: "Interchangeable algorithms for statistical forecasting."
type: "r"
gofPattern: "Strategy"
gofCategory: "Behavioral"
arcaneSchool: "Divination // Interchangeable Scrying"
formula: |
  library(R6)

  # Strategy Interface
  ScryingStrategy <- R6Class("ScryingStrategy",
    public = list(
      predict = function(data) stop("Not implemented")
    )
  )

  # Concrete Strategies
  BayesianScry <- R6Class("BayesianScry", inherit = ScryingStrategy,
    public = list(
      predict = function(data) {
        paste("Using Bayesian priors on", data)
      }
    )
  )

  FrequentistScry <- R6Class("FrequentistScry", inherit = ScryingStrategy,
    public = list(
      predict = function(data) {
        paste("Using Frequentist limits on", data)
      }
    )
  )

  # Context
  Haruspex <- R6Class("Haruspex",
    private = list(
      strategy = NULL
    ),
    public = list(
      set_strategy = function(strategy) {
        private$strategy <- strategy
      },
      foresee = function(data) {
        private$strategy$predict(data)
      }
    )
  )
tags: ["R6", "Divination", "Behavioral", "Strategy"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Depending on the nature of the data anomaly, the Haruspex can swap between Bayesian or Frequentist strategies at runtime.
