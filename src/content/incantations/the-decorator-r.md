---
title: "The Decorator: Layering Enhancements"
description: "Dynamically adding arcane power to statistical models."
type: "r"
gofPattern: "Decorator"
gofCategory: "Structural"
arcaneSchool: "Divination // Augmentation"
formula: |
  library(R6)

  # Component
  BaseModel <- R6Class("BaseModel",
    public = list(
      evaluate = function() stop("Not implemented")
    )
  )

  # Concrete Component
  LinearOmen <- R6Class("LinearOmen", inherit = BaseModel,
    public = list(
      evaluate = function() "Evaluating base linear omen."
    )
  )

  # Decorator
  ModelDecorator <- R6Class("ModelDecorator", inherit = BaseModel,
    private = list(
      component = NULL
    ),
    public = list(
      initialize = function(component) {
        private$component <- component
      },
      evaluate = function() {
        private$component$evaluate()
      }
    )
  )

  # Concrete Decorator
  BloodSacrificeDecorator <- R6Class("BloodSacrificeDecorator", inherit = ModelDecorator,
    public = list(
      evaluate = function() {
        base_result <- super$evaluate()
        paste(base_result, "Augmented with Blood Sacrifice (+5 accuracy).")
      }
    )
  )
tags: ["R6", "Divination", "Structural", "Decorator"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Wrap standard scrying models in Decorators to inject additional powers, like caching, logging, or arcane sacrifices, without modifying the core algorithms.
