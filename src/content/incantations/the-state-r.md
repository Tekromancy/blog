---
title: "The State: Phases of the Moon"
description: "Altering behavior based on internal state shifts."
type: "r"
gofPattern: "State"
gofCategory: "Behavioral"
arcaneSchool: "Divination // Phase Shifting"
formula: |
  library(R6)

  # State Interface
  MoonPhase <- R6Class("MoonPhase",
    public = list(
      cast_spell = function(context) stop("Not implemented")
    )
  )

  # Concrete States
  FullMoon <- R6Class("FullMoon", inherit = MoonPhase,
    public = list(
      cast_spell = function(context) {
        "Casting with maximum power!"
      }
    )
  )

  NewMoon <- R6Class("NewMoon", inherit = MoonPhase,
    public = list(
      cast_spell = function(context) {
        "Casting subtly from the shadows."
      }
    )
  )

  # Context
  Spellcaster <- R6Class("Spellcaster",
    private = list(
      state = NULL
    ),
    public = list(
      initialize = function(state) {
        self$transition_to(state)
      },
      transition_to = function(state) {
        private$state <- state
      },
      execute = function() {
        private$state$cast_spell(self)
      }
    )
  )
tags: ["R6", "Divination", "Behavioral", "State"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The algorithm behaves entirely differently depending on its state (the phase of the moon), cleanly encapsulating state-specific logic.
