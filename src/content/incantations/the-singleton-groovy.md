---
title: The Singleton Hex
description: Ensuring only one instance of an ancient nexus exists in the runtime.
type: groovy
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Conjuration // Singularism"
formula: |2
  @Singleton
  class NexusCore {
      int energy = 100

      def tap() {
          energy -= 10
          println "Nexus tapped. Energy remaining: $energy"
      }
  }

  NexusCore.instance.tap()
  NexusCore.instance.tap()

  // def duplicate = new NexusCore() // This would trigger a runtime hex-breach (Exception)
tags: [groovy, creational, singleton, ast-transform]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Singleton Hex

A Singleton dictates that a magical construct must be singular and unique across the entire JVM continuum. Groovy encapsulates the tedious locking and instantiation checks behind the `@Singleton` AST annotation. Access the single nexus via `.instance`, knowing the thread-safe magic holds firm.
