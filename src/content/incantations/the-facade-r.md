---
title: "The Facade: The High Priest's Interface"
description: "Providing a simplified interface to a complex system of divination subsystems."
type: "r"
gofPattern: "Facade"
gofCategory: "Structural"
arcaneSchool: "Divination // Simplification"
formula: |2
  library(R6)

  # Subsystems
  DataAcquisition <- R6Class("DataAcquisition",
    public = list(
      gather = function() "Gathering souls..."
    )
  )

  MatrixComputation <- R6Class("MatrixComputation",
    public = list(
      compute = function() "Multiplying reality matrices..."
    )
  )

  # Facade
  RitualFacade <- R6Class("RitualFacade",
    private = list(
      acquisition = NULL,
      computation = NULL
    ),
    public = list(
      initialize = function() {
        private$acquisition <- DataAcquisition$new()
        private$computation <- MatrixComputation$new()
      },
      perform_ritual = function() {
        step1 <- private$acquisition$gather()
        step2 <- private$computation$compute()
        paste("Ritual complete:", step1, step2)
      }
    )
  )
tags: ["R6", "Divination", "Structural", "Facade"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Ritual Facade hides the immense complexity of data loading, cleaning, and model fitting behind a single `perform_ritual()` incantation.
