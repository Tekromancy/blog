---
title: "The Factory Method: Spawning Divination Threads"
description: "Deferring the creation of specific statistical scrying models."
type: "r"
gofPattern: "Factory Method"
gofCategory: "Creational"
arcaneSchool: "Divination // Scrying Weaver"
formula: |
  library(R6)

  # Product interface
  DivinationThread <- R6Class("DivinationThread",
    public = list(
      weave = function() stop("Not implemented")
    )
  )

  # Concrete Products
  OmenThread <- R6Class("OmenThread", inherit = DivinationThread,
    public = list(
      weave = function() "Weaving an omen from the data streams."
    )
  )

  CurseThread <- R6Class("CurseThread", inherit = DivinationThread,
    public = list(
      weave = function() "Weaving a statistical curse into the model."
    )
  )

  # Creator
  ThreadSpinner <- R6Class("ThreadSpinner",
    public = list(
      create_thread = function() stop("Not implemented"),
      execute_weave = function() {
        thread <- self$create_thread()
        thread$weave()
      }
    )
  )

  # Concrete Creators
  OmenSpinner <- R6Class("OmenSpinner", inherit = ThreadSpinner,
    public = list(
      create_thread = function() OmenThread$new()
    )
  )

  CurseSpinner <- R6Class("CurseSpinner", inherit = ThreadSpinner,
    public = list(
      create_thread = function() CurseThread$new()
    )
  )
tags: ["R6", "Divination", "Creational", "Factory Method"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Weaver creates threads of varying types depending on the subclass, allowing the base ritual to operate generically on the result.
