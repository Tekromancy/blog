---
title: "The Composite: Trees of Fate"
description: "Building hierarchical structures of statistical predictions."
type: "r"
gofPattern: "Composite"
gofCategory: "Structural"
arcaneSchool: "Divination // Structure Weaving"
formula: |2
  library(R6)

  # Component
  FateNode <- R6Class("FateNode",
    public = list(
      get_probability = function() stop("Not implemented")
    )
  )

  # Leaf
  SimpleOmen <- R6Class("SimpleOmen", inherit = FateNode,
    private = list(
      prob = 0
    ),
    public = list(
      initialize = function(prob) {
        private$prob <- prob
      },
      get_probability = function() {
        return(private$prob)
      }
    )
  )

  # Composite
  FateCluster <- R6Class("FateCluster", inherit = FateNode,
    private = list(
      children = list()
    ),
    public = list(
      add = function(node) {
        private$children <- append(private$children, node)
      },
      get_probability = function() {
        probs <- sapply(private$children, function(child) child$get_probability())
        return(mean(probs)) # The average probability of the cluster
      }
    )
  )
tags: ["R6", "Divination", "Structural", "Composite"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Haruspex treats individual omens and clusters of omens exactly the same, applying calculations recursively through the composite tree.
