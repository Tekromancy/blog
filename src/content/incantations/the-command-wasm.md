---
title: The Command
description: Encapsulating arcane rituals as executable stack closures for delayed invocation.
type: wasm
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Domination"
formula: |2
  (module
    (type $command (func))
    (table 1 funcref)
    (elem (i32.const 0) $smite_command)
    (func $smite_command
      ;; Execution logic
    )
    (func $execute_command (param $cmd_idx i32)
      (call_indirect (type $command) (local.get $cmd_idx))
    )
  )
tags: [WASM, Command, Enchantment]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Command
To delay the execution of a destructive ritual, one must encapsulate its essence. The `Command` pattern binds the parameters and the invocation into a single stack closure, storing it in the funcref table to be unleashed at the optimal moment.
