---
title: The Command (jq)
description: Encapsulate operations as discrete JSON objects for deferred execution.
type: jq
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Binding"
formula: |2
  # Command definitions
  # { "cmd": "add", "args": [10, 20] }

  # The Invoker
  def execute_command:
    if .cmd == "add" then
      .args[0] + .args[1]
    elif .cmd == "concat" then
      .args | join("")
    else
      "Unknown Command"
    end;

  # Processing the macro sequence
  .macro_sequence[] | execute_command
tags: [jq, json, transmutation, gof]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

By capturing an action and its parameters within a hardened JSON shell, the **Command** pattern converts behavior into data. These command packets can be queued, logged, or reversed before they are eventually fed into the Invoker filter. It is the ultimate decoupling of intention and execution in the datascape.
