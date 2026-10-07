---
title: The Command Hex
description: Encapsulating a request as an object, letting you parameterize clients with closures.
type: groovy
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Invocation"
formula: |2
  class Drone {
      void fly() { println "Drone takes flight" }
      void land() { println "Drone lands" }
  }

  class Controller {
      List<Closure> history = []

      void executeCommand(Closure command) {
          command()
          history << command
      }

      void replay() {
          println "Replaying commands..."
          history.each { it() }
      }
  }

  def drone = new Drone()
  def remote = new Controller()

  // Commands as simple closures
  remote.executeCommand { drone.fly() }
  remote.executeCommand { drone.land() }

  remote.replay()
tags: [groovy, behavioral, command, closures]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Command Hex

In Java, the Command hex requires an interface and multiple concrete classes. In Groovy, a Command is simply a `Closure`. By passing closures around, a mage encapsulates entire execution trees as first-class objects, storing them in arrays for delayed execution, queuing, or historical replays of drone maneuvers.
