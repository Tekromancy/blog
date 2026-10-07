---
title: "The Command: Encapsulating the Ritual"
description: "Wrapping divination requests into objects."
type: "r"
gofPattern: "Command"
gofCategory: "Behavioral"
arcaneSchool: "Divination // Incantation Storage"
formula: |2
  library(R6)

  # Command Interface
  RitualCommand <- R6Class("RitualCommand",
    public = list(
      execute = function() stop("Not implemented")
    )
  )

  # Receiver
  DivinationAltar <- R6Class("DivinationAltar",
    public = list(
      burn_incense = function() "Incense burning.",
      read_bones = function() "Bones read."
    )
  )

  # Concrete Command
  PerformDivinationCommand <- R6Class("PerformDivinationCommand", inherit = RitualCommand,
    private = list(
      altar = NULL
    ),
    public = list(
      initialize = function(altar) {
        private$altar <- altar
      },
      execute = function() {
        paste(private$altar$burn_incense(), private$altar$read_bones())
      }
    )
  )

  # Invoker
  Acolyte <- R6Class("Acolyte",
    private = list(
      command = NULL
    ),
    public = list(
      set_command = function(command) {
        private$command <- command
      },
      invoke = function() {
        private$command$execute()
      }
    )
  )
tags: ["R6", "Divination", "Behavioral", "Command"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Commands encapsulate all information needed to perform an action or trigger an event later, letting acolytes queue rituals overnight.
