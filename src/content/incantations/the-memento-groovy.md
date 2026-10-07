---
title: The Memento Hex
description: Capturing and restoring an object's internal state without violating encapsulation.
type: groovy
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Enchantment // Chronomancy"
formula: |2
  class TimeCapsule {
      final Map state
      TimeCapsule(Map state) { this.state = state.clone() as Map }
  }

  class CyberDeck {
      String targetIP
      int powerLevel

      TimeCapsule save() { new TimeCapsule([targetIP: targetIP, powerLevel: powerLevel]) }
      void restore(TimeCapsule capsule) {
          this.targetIP = capsule.state.targetIP
          this.powerLevel = capsule.state.powerLevel
      }

      String toString() { "Deck targeting $targetIP at power $powerLevel" }
  }

  def deck = new CyberDeck(targetIP: "192.168.1.1", powerLevel: 10)
  println "Initial: $deck"

  def backup = deck.save()
  deck.targetIP = "10.0.0.99"
  deck.powerLevel = 100
  println "Hacked: $deck"

  deck.restore(backup)
  println "Restored: $deck"
tags: [groovy, behavioral, memento]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Memento Hex

The Memento hex allows a cyber-mage to bookmark the exact state of a volatile system and reverse time when a hack goes wrong. By leveraging Groovy's map cloning and property access, a lightweight snapshot can be created and stored in a temporal vault, safe from external mutation, ready to revert the cyber-deck to safe parameters.
