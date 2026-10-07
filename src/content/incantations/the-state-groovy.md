---
title: The State Hex
description: Allowing an entity to alter its behavior when its internal state changes.
type: groovy
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Enchantment // Polymorphism"
formula: |2
  interface BotState { void act(Bot context) }

  class PatrolState implements BotState {
      void act(Bot context) {
          println "Bot is patrolling..."
          context.state = new CombatState() // State transition
      }
  }

  class CombatState implements BotState {
      void act(Bot context) {
          println "Bot engages target!"
          context.state = new PatrolState()
      }
  }

  class Bot {
      BotState state = new PatrolState()
      void update() { state.act(this) }
  }

  def sentry = new Bot()
  sentry.update()
  sentry.update()
tags: [groovy, behavioral, state]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The State Hex

The State hex transforms branching if/else conditional logic into elegant polymorphic objects. Each state governs its own behavior and possesses the authority to shift the parent entity into a new configuration. In the cyber-realm, drones switch from patrol to combat protocols seamlessly without cluttering their core processors with tangled conditional logic.
