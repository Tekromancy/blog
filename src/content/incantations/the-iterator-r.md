---
title: "The Iterator: Walking the Timeline"
description: "Traversing complex temporal collections without exposing underlying representations."
type: "r"
gofPattern: "Iterator"
gofCategory: "Behavioral"
arcaneSchool: "Divination // Temporal Stepping"
formula: |2
  library(R6)

  # Iterator Interface
  Iterator <- R6Class("Iterator",
    public = list(
      has_next = function() stop("Not implemented"),
      next_item = function() stop("Not implemented")
    )
  )

  # Concrete Iterator
  TimelineIterator <- R6Class("TimelineIterator", inherit = Iterator,
    private = list(
      collection = NULL,
      position = 0
    ),
    public = list(
      initialize = function(collection) {
        private$collection <- collection
        private$position <- 1
      },
      has_next = function() {
        return(private$position <= length(private$collection))
      },
      next_item = function() {
        if (self$has_next()) {
          item <- private$collection[private$position]
          private$position <- private$position + 1
          return(item)
        }
        return(NULL)
      }
    )
  )
tags: ["R6", "Divination", "Behavioral", "Iterator"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Walk linearly through the branches of time. The Iterator shields the Data Haruspex from the underlying implementation of the multiverse data structure.
