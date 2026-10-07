---
title: "The Chain of Responsibility: Passing the Omen"
description: "A chain of handlers processing statistical anomalies."
type: "r"
gofPattern: "Chain of Responsibility"
gofCategory: "Behavioral"
arcaneSchool: "Divination // Sequential Filtering"
formula: |2
  library(R6)

  # Handler Interface
  OmenHandler <- R6Class("OmenHandler",
    private = list(
      next_handler = NULL
    ),
    public = list(
      set_next = function(handler) {
        private$next_handler <- handler
        return(handler)
      },
      handle = function(omen_severity) {
        if (!is.null(private$next_handler)) {
          return(private$next_handler$handle(omen_severity))
        }
        return(NULL)
      }
    )
  )

  # Concrete Handlers
  NoviceHaruspex <- R6Class("NoviceHaruspex", inherit = OmenHandler,
    public = list(
      handle = function(omen_severity) {
        if (omen_severity < 10) {
          return("Novice handled the minor omen.")
        } else {
          return(super$handle(omen_severity))
        }
      }
    )
  )

  MasterHaruspex <- R6Class("MasterHaruspex", inherit = OmenHandler,
    public = list(
      handle = function(omen_severity) {
        if (omen_severity >= 10) {
          return("Master handled the catastrophic omen.")
        } else {
          return(super$handle(omen_severity))
        }
      }
    )
  )
tags: ["R6", "Divination", "Behavioral", "Chain of Responsibility"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Chain of Responsibility passes statistical anomalies up the hierarchy. Novices handle minor deviations, while Masters handle world-ending prophecies.
