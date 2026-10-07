---
title: "The Observer Node"
description: "A publish-subscribe mechanism notifying dependents of state changes."
type: agda
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Network Scrying"
formula: |2
  module ObserverPattern where
  
  open import Data.String
  open import Data.List
  
  Observer : Set
  Observer = String → String
  
  record Subject : Set where
    field
      observers : List Observer
      notifyAll : String → List String
tags: ["agda", "observer", "pub-sub"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Observer Node

When the core temperature of a server spikes, a dozen cooling systems and admin alerts must trigger. The **Observer Node** maintains a list of attached familiars, alerting them synchronously when an event unfolds.

## The Dependent Runes

We store functions (`String → String` or similar IO handlers) within a Subject's list. When an update occurs, a map over the `observers` guarantees every dependent receives the arcane echo.
