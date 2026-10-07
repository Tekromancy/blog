---
title: The Command
description: Encapsulates a spell as an object, allowing parameterization and queuing of magical requests.
type: tcl
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Evocation // Invocation"
formula: |2
  oo::class create SpellCommand {
      method execute {} { error "Not implemented" }
  }

  oo::class create OverclockDevice {
      variable target
      constructor {t} { set target $t }
      method execute {} { puts "Overclocking systems on $target! Heat rising." }
  }

  oo::class create SpellQueue {
      variable commands
      constructor {} { set commands {} }
      method store {cmd} { lappend commands $cmd }
      method unleash {} {
          foreach cmd $commands {
              $cmd execute
          }
          set commands {}
      }
  }

  set q [SpellQueue new]
  $q store [OverclockDevice new "Mainframe Alpha"]
  $q store [OverclockDevice new "Turret 4"]

  puts "Spells queued. Waiting for optimal moment..."
  $q unleash
tags: [behavioral, command, evocation, queueing]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Command

Spells are not always cast instantly. In complex incursions, invocations are encapsulated into runic objects, loaded into an arcane queue, and held in stasis. When the breach is open, the Invoker unleashes the sequence, firing every stored command with synchronous devastation.
