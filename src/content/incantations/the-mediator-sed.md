---
title: The Central Nexus (Mediator)
description: Defining an object that encapsulates how a set of patterns interact.
type: sed
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Transmutation // Streamweaving"
formula: |2
  # Mediator: Centralize routing instead of complex direct jumps
  # All events go to the mediator label
  /EVENT_A/ b mediator
  /EVENT_B/ b mediator
  b
  
  :mediator
  /EVENT_A/ {
    s/.*/Mediated A reaction/
  }
  /EVENT_B/ {
    s/.*/Mediated B reaction/
  }
tags: [sed, behavioral, mediator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
