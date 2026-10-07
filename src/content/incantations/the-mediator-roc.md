---
title: The Mediator of Spirits
description: Centralizing communication between disparate elemental spirits to prevent chaos.
type: roc
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Conjuration // Binding"
tags: [fast-functional-wards, roc, mediator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
formula: |2
  interface SpiritMediator
      exposes [Spirit, Event, handleEvent]
      imports []

  Spirit : [Ignis, Aquam, Terram]
  Event : [Attack, Defend]

  # The Mediator manages how spirits react to events globally
  handleEvent : Event, List Spirit -> Str
  handleEvent = \event, spirits ->
      when event is
          Attack ->
              if List.contains spirits Ignis then
                  "Ignis launches a fireball!"
              else
                  "No offensive spirit available."
          Defend ->
              if List.contains spirits Terram then
                  "Terram raises an earth wall!"
              else
                  "No defensive spirit available."
---
