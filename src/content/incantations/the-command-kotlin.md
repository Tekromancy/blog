---
title: The Command Hex
description: Encapsulating arcane intents into executable crystals.
type: kotlin
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Binding"
formula: |2
  interface SpellCommand {
      fun execute()
      fun undo()
  }

  class TeleportCommand(private val target: String) : SpellCommand {
      override fun execute() = println("Teleporting to $target")
      override fun undo() = println("Recalling from $target")
  }

  class Wand {
      private val history = mutableListOf<SpellCommand>()

      fun cast(command: SpellCommand) {
          command.execute()
          history.add(command)
      }

      fun rewind() {
          if (history.isNotEmpty()) history.removeLast().undo()
      }
  }
tags: [kotlin, behavioral, command]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Command Hex

Intent alone is not enough; it must be crystallized. The Command pattern wraps an invocation into a distinct object, allowing it to be queued, delayed, or inverted. This is essential for temporal magic, allowing a wand to keep a history of cast spells and unweave them via the `undo` invocation.
