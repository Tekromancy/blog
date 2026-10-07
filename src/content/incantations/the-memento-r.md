---
title: "The Memento: Rewinding Time"
description: "Capturing and restoring the state of a prophecy."
type: "r"
gofPattern: "Memento"
gofCategory: "Behavioral"
arcaneSchool: "Divination // Time Reversal"
formula: |2
  library(R6)

  # Memento
  ProphecyMemento <- R6Class("ProphecyMemento",
    private = list(
      state = NULL
    ),
    public = list(
      initialize = function(state) {
        private$state <- state
      },
      get_state = function() {
        return(private$state)
      }
    )
  )

  # Originator
  TimeScryer <- R6Class("TimeScryer",
    private = list(
      state = NULL
    ),
    public = list(
      set_state = function(state) {
        private$state <- state
      },
      save = function() {
        return(ProphecyMemento$new(private$state))
      },
      restore = function(memento) {
        private$state <- memento$get_state()
      },
      get_current_state = function() {
        return(private$state)
      }
    )
  )
tags: ["R6", "Divination", "Behavioral", "Memento"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When a prediction algorithm corrupts the timeline, the Memento allows the Haruspex to restore the matrix to a pristine prior state without exposing internal fields.
