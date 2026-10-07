---
title: The Command Word
description: Encapsulate a complete magical evocation as a first-class object that can be stored or delayed.
type: scala
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Evocation // Invocation"
formula: |2
  trait Command { def execute(): Unit }

  class Golem {
    def walk(): Unit = println("Golem steps forward.")
    def smash(): Unit = println("Golem smashes target.")
  }

  case class WalkCommand(golem: Golem) extends Command {
    def execute(): Unit = golem.walk()
  }

  case class SmashCommand(golem: Golem) extends Command {
    def execute(): Unit = golem.smash()
  }

  class RitualSequence {
    private var history = List.empty[Command]

    def invoke(command: Command): Unit = {
      command.execute()
      history = history :+ command
    }
  }
tags: [scala, behavioral, evocation, delayed-magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
The Command pattern captures intents. By storing executions in an immutable list, one could even implement a `Chronamancy` (Undo) function effortlessly.
