---
title: The Command in AWK
description: Encode execution directives as strings to be interpreted and dispatched dynamically.
type: awk
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Evocation // Directive-Binding"
formula: |2
  # The Invoker mechanism
  function dispatch_command(cmd, arg1, arg2) {
      if (cmd == "ECHO") {
          print "[ECHO] " arg1
      } else if (cmd == "CONCAT") {
          print "[CONCAT] " arg1 "" arg2
      } else if (cmd == "HALT") {
          print "[SYSTEM] Halting operations."
          exit arg1
      } else {
          print "[ERROR] Unknown command sigil: " cmd
      }
  }
  
  BEGIN { 
      # Queue of commands (could be read from a file)
      dispatch_command("ECHO", "Initializing runic sequences...")
      dispatch_command("CONCAT", "Cyber", "punk")
      dispatch_command("HALT", 0)
  }
tags: [awk, text-processing, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Command pattern in AWK transforms raw text tokens into actionable system states. By routing data through a central dispatcher based on a command keyword, AWK scripts can act as minimal virtual machines or DSL interpreters.
