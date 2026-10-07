---
title: "The Observer: Sensing the Void"
description: "Publish/Subscribe mechanisms for ethereal events."
type: "r"
gofPattern: "Observer"
gofCategory: "Behavioral"
arcaneSchool: "Divination // Event Scrying"
formula: |
  library(R6)

  # Subject
  EtherPulse <- R6Class("EtherPulse",
    private = list(
      observers = list(),
      state = NULL
    ),
    public = list(
      attach = function(observer) {
        private$observers <- append(private$observers, observer)
      },
      set_state = function(state) {
        private$state <- state
        self$notify()
      },
      notify = function() {
        for (obs in private$observers) {
          obs$update(private$state)
        }
      }
    )
  )

  # Observer
  Observer <- R6Class("Observer",
    public = list(
      update = function(state) stop("Not implemented")
    )
  )

  AcolyteWatcher <- R6Class("AcolyteWatcher", inherit = Observer,
    public = list(
      update = function(state) {
        paste("Acolyte perceived a shift:", state)
      }
    )
  )
tags: ["R6", "Divination", "Behavioral", "Observer"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Observer allows multiple entities to subscribe to pulses in the Ether. When the data stream shifts, all Watchers are instantly notified to update their models.
