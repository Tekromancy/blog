---
title: "The Mediator: Center of the Seance"
description: "Reducing chaotic dependencies between divination modules."
type: "r"
gofPattern: "Mediator"
gofCategory: "Behavioral"
arcaneSchool: "Divination // Coordination"
formula: |
  library(R6)

  # Mediator Interface
  SeanceMediator <- R6Class("SeanceMediator",
    public = list(
      notify = function(sender, event) stop("Not implemented")
    )
  )

  # Concrete Mediator
  RitualCircle <- R6Class("RitualCircle", inherit = SeanceMediator,
    public = list(
      component1 = NULL,
      component2 = NULL,
      notify = function(sender, event) {
        if (event == "chant") {
          self$component2$react_to_chant()
        }
      }
    )
  )

  # Components
  BaseComponent <- R6Class("BaseComponent",
    public = list(
      mediator = NULL,
      initialize = function(mediator = NULL) {
        self$mediator <- mediator
      }
    )
  )

  Chanter <- R6Class("Chanter", inherit = BaseComponent,
    public = list(
      do_chant = function() {
        self$mediator$notify(self, "chant")
      }
    )
  )

  Listener <- R6Class("Listener", inherit = BaseComponent,
    public = list(
      react_to_chant = function() {
        "Reacting to the chant from the void."
      }
    )
  )
tags: ["R6", "Divination", "Behavioral", "Mediator"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Mediator coordinates the elements of the seance so that Chanters and Listeners do not need direct references to each other, maintaining a clean astral environment.
