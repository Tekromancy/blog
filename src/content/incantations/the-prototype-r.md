---
title: "The Prototype: Cloning the Prophecy"
description: "Duplicating arcane statistical objects without re-initializing them."
type: "r"
gofPattern: "Prototype"
gofCategory: "Creational"
arcaneSchool: "Divination // Cloning"
formula: |
  library(R6)

  # Prototype
  ProphecyDraft <- R6Class("ProphecyDraft",
    public = list(
      prediction = NULL,
      confidence = NULL,
      initialize = function(prediction, confidence) {
        self$prediction <- prediction
        self$confidence <- confidence
      },
      clone_prophecy = function() {
        # R6 environments are by reference, clone(deep=TRUE) handles nested
        self$clone(deep = TRUE)
      },
      show = function() {
        paste("Prophecy:", self$prediction, "| Confidence:", self$confidence)
      }
    )
  )
tags: ["R6", "Divination", "Creational", "Prototype"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Sometimes constructing a prophecy is computationally expensive. We clone an existing baseline and tweak it, saving valuable compute cycles in the astral plane.
