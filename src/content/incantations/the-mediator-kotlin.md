---
title: The Mediator Hex
description: A central hub for managing chaotic component communications.
type: kotlin
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Orchestration"
formula: |2
  class CombatMediator {
      fun notify(sender: String, event: String) {
          println("Mediator intercepts $event from $sender, updating battlefield.")
      }
  }

  class Mage(private val name: String, private val mediator: CombatMediator) {
      fun castAoe() {
          println("$name casts Blizzard!")
          mediator.notify(name, "Blizzard Cast")
      }
  }
tags: [kotlin, behavioral, mediator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Mediator Hex

When too many components intercommunicate, the system degrades into a tangled web of fatal dependencies. The Mediator Hex acts as a centralized command nexus. Entities report their status to the Mediator, which then orchestrates the broader systemic response, keeping individual mages blissfully uncoupled from each other.
