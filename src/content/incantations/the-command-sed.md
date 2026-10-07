---
title: The Executable Rune (Command)
description: Encapsulating a request as an object (a constructed sed command string) for later execution.
type: sed
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Transmutation // Streamweaving"
formula: |2
  # Command: Storing commands in the hold space to execute later (requires GNU sed `e`)
  /^CMD:/ {
    s/^CMD://
    h
    d
  }
  /^EXEC/ {
    g
    # 'e' command evaluates the pattern space as a shell command
    e
  }
tags: [sed, behavioral, command]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
