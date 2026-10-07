---
title: The Command Pattern
description: Encapsulating a spell request as an object.
type: swift
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: Evocation // Invocation
formula: |
  protocol Command {
      func execute()
  }
  class HealCommand: Command {
      func execute() { print("Casting Heal") }
  }
  class Invoker {
      private var commands: [Command] = []
      func storeAndExecute(command: Command) {
          commands.append(command)
          command.execute()
      }
  }
tags: [swift, design-pattern, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Command: The Stored Invocation

By encapsulating a spell as a `Command`, an `Invoker` can queue, store, or delay its execution.
