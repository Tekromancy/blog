---
title: The Command Pattern of Magic Actions
description: Encapsulate a request as an object, thereby letting you parameterize clients with different requests in Move.
type: move
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Evocation // Invocation"
formula: |2
  module arcane::command {
      struct Command has store, drop {
          action_type: u8, // 0 for heal, 1 for attack
          target: address,
          value: u64,
      }
  
      public fun create_heal_command(target: address, amount: u64): Command {
          Command { action_type: 0, target, value: amount }
      }
  
      public fun execute(cmd: Command) {
          let Command { action_type, target: _, value: _ } = cmd;
          if (action_type == 0) {
              // Execute heal logic
          } else if (action_type == 1) {
              // Execute attack logic
          }
      }
  }
tags: [behavioral, command, move, actions]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
