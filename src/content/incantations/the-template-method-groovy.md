---
title: The Template Method Hex
description: Defining the skeleton of an operation, deferring steps to subclasses or closures.
type: groovy
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Enchantment // Structuration"
formula: |2
  abstract class DataMiner {
      // The Template Method
      void mine() {
          connect()
          extract()
          disconnect()
      }

      void connect() { println "Connecting to network..." }
      void disconnect() { println "Cutting connection." }

      // Hook to be implemented
      abstract void extract()
  }

  class CryptoMiner extends DataMiner {
      void extract() { println "Mining crypto hashes..." }
  }

  class PasswordMiner extends DataMiner {
      void extract() { println "Scraping password tables..." }
  }

  new CryptoMiner().mine()
  println "---"
  new PasswordMiner().mine()
tags: [groovy, behavioral, template-method]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Template Method Hex

When a ritual must be followed in an exact, unyielding sequence, the Template Method hex binds the order of operations into a final framework. The mage then leaves specific hooks open—like the `extract` method—allowing subordinate spells or specific implementations to fill in the critical variables without disrupting the larger, sacred flow of execution.
