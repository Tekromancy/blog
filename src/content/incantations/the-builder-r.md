---
title: "The Builder: Constructing the Scrying Orb"
description: "Step-by-step construction of complex divination models."
type: "r"
gofPattern: "Builder"
gofCategory: "Creational"
arcaneSchool: "Divination // Model Artifice"
formula: |2
  library(R6)

  # Product
  ScryingModel <- R6Class("ScryingModel",
    public = list(
      layers = NULL,
      initialize = function() {
        self$layers <- list()
      },
      add_layer = function(layer) {
        self$layers <- append(self$layers, layer)
      },
      describe = function() {
        paste("Model layers:", paste(self$layers, collapse = ", "))
      }
    )
  )

  # Builder Interface
  ModelBuilder <- R6Class("ModelBuilder",
    public = list(
      reset = function() stop("Not implemented"),
      add_data_ingestion = function() stop("Not implemented"),
      add_feature_extraction = function() stop("Not implemented"),
      get_result = function() stop("Not implemented")
    )
  )

  # Concrete Builder
  ProphecyBuilder <- R6Class("ProphecyBuilder", inherit = ModelBuilder,
    private = list(
      model = NULL
    ),
    public = list(
      initialize = function() {
        self$reset()
      },
      reset = function() {
        private$model <- ScryingModel$new()
      },
      add_data_ingestion = function() {
        private$model$add_layer("Blood Sacrament Ingestion")
      },
      add_feature_extraction = function() {
        private$model$add_layer("Entrails Feature Extraction")
      },
      get_result = function() {
        res <- private$model
        self$reset()
        return(res)
      }
    )
  )

  # Director
  HighPriest <- R6Class("HighPriest",
    private = list(
      builder = NULL
    ),
    public = list(
      set_builder = function(builder) {
        private$builder <- builder
      },
      construct_prophecy_model = function() {
        private$builder$add_data_ingestion()
        private$builder$add_feature_extraction()
      }
    )
  )
tags: ["R6", "Divination", "Creational", "Builder"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The High Priest directs the construction of complex Scrying Models, layering arcane features step by step.
