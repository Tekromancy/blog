---
title: The Mediator Pattern
description: Centralizing complex communication between magical entities.
type: swift
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Orchestration"
formula: |2
  protocol Mediator {
      func notify(sender: Colleague, event: String)
  }
  class Colleague {
      var mediator: Mediator?
  }
  class Familiar: Colleague {
      func spotEnemy() { mediator?.notify(sender: self, event: "EnemySpotted") }
  }
  class Sorcerer: Mediator {
      func notify(sender: Colleague, event: String) {
          if event == "EnemySpotted" { print("Preparing defense spells") }
      }
  }
tags: [swift, design-pattern, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Mediator: The Sorcerer's Command

The Mediator centralizes communication. The `Sorcerer` listens to their `Familiar`, preventing a chaotic web of direct entity-to-entity bindings.
