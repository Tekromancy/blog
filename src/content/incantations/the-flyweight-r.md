---
title: "The Flyweight: Sharing the Data Points"
description: "Conserving memory by sharing intrinsic state across millions of omens."
type: "r"
gofPattern: "Flyweight"
gofCategory: "Structural"
arcaneSchool: "Divination // Memory Compression"
formula: |
  library(R6)

  # Flyweight
  OmenType <- R6Class("OmenType",
    public = list(
      name = NULL,
      color = NULL,
      initialize = function(name, color) {
        self$name <- name
        self$color <- color
      },
      display = function(x, y) {
        paste("Omen", self$name, "at", x, y, "in color", self$color)
      }
    )
  )

  # Flyweight Factory
  OmenFactory <- R6Class("OmenFactory",
    private = list(
      omen_types = list()
    ),
    public = list(
      get_omen_type = function(name, color) {
        key <- paste(name, color, sep="_")
        if (is.null(private$omen_types[[key]])) {
          private$omen_types[[key]] <- OmenType$new(name, color)
        }
        return(private$omen_types[[key]])
      }
    )
  )
tags: ["R6", "Divination", "Structural", "Flyweight"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When simulating a trillion possible futures, memory limits the Data Haruspex. The Flyweight pattern compresses shared characteristics to avoid out-of-memory astral tears.
