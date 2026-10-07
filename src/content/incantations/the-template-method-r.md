---
title: "The Template Method: The Standard Ritual"
description: "Defining the skeleton of a divination process."
type: "r"
gofPattern: "Template Method"
gofCategory: "Behavioral"
arcaneSchool: "Divination // Ritual Skeleton"
formula: |
  library(R6)

  # Abstract Class
  BaseRitual <- R6Class("BaseRitual",
    public = list(
      perform = function() {
        self$purify()
        self$chant()
        self$conclude()
      },
      purify = function() {
        "Purifying the circle."
      },
      chant = function() stop("Subclasses must implement chant"),
      conclude = function() {
        "Closing the portal."
      }
    )
  )

  # Concrete Class
  FireRitual <- R6Class("FireRitual", inherit = BaseRitual,
    public = list(
      chant = function() {
        "Chanting the words of Flame!"
      }
    )
  )
tags: ["R6", "Divination", "Behavioral", "Template Method"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Base Ritual dictates the strict sequence of purification, chanting, and closing. Subclasses only override the specific chant, ensuring the portal is always closed safely.
