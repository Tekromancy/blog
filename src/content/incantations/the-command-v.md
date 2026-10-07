---
title: "The Command Sigil"
description: "Encapsulating a spellcast as an object to queue, log, or undo it."
type: v
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Delayed Execution"
formula: |2
  module main

  interface Command {
  	execute()
  }

  // Receiver
  struct Drone {
  	id int
  }
  fn (d Drone) strike() { println("Drone \$d.id fires laser.") }
  fn (d Drone) heal() { println("Drone \$d.id emits repair nanites.") }

  // Concrete Commands
  struct StrikeCommand {
  	drone Drone
  }
  fn (c StrikeCommand) execute() { c.drone.strike() }

  struct HealCommand {
  	drone Drone
  }
  fn (c HealCommand) execute() { c.drone.heal() }

  // Invoker
  struct BattleGrid {
  mut:
  	queue []Command
  }
  fn (mut b BattleGrid) add_command(c Command) {
  	b.queue << c
  }
  fn (mut b BattleGrid) execute_all() {
  	for c in b.queue {
  		c.execute()
  	}
  	b.queue.clear()
  }

  fn main() {
  	drone := Drone{id: 77}
  	mut grid := BattleGrid{}

  	grid.add_command(StrikeCommand{drone: drone})
  	grid.add_command(HealCommand{drone: drone})

  	println("Executing queued commands:")
  	grid.execute_all()
  }
tags: [vlang, command, behavioral, execution]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Command Sigil

Instead of directly invoking an entity's actions, the Command Sigil wraps the request into an executable artifact. This allows the magus to queue spells on a `BattleGrid`, pass them across thread boundaries, or log them for post-mortem combat analysis. In V, keeping command payloads as immutable values guarantees thread safety out of the box.
