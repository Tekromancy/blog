---
title: The Command of the Forbidden Runes
description: Encapsulate incantations as objects, allowing for delayed or stored executions.
type: bcpl
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Evocation // Rune-Binding"
formula: |2
  GET "libhdr"

  MANIFEST $(
    CMD_TYPE = 0
    CMD_ARG = 1
    CMD_SIZE = 2

    RUNE_OBLITERATE = 1
    RUNE_REJUVENATE = 2
  $)

  LET CreateRuneCommand(type, arg) = VALOF $(
    LET cmd = getvec(CMD_SIZE)
    cmd!CMD_TYPE = type
    cmd!CMD_ARG = arg
    RESULTIS cmd
  $)

  LET ExecuteCommand(cmd) BE $(
    SWITCHON cmd!CMD_TYPE INTO $(
      CASE RUNE_OBLITERATE:
        writef("Obliterating target %d with void fire!*n", cmd!CMD_ARG)
        ENDCASE
      CASE RUNE_REJUVENATE:
        writef("Rejuvenating target %d with dark matter.*n", cmd!CMD_ARG)
        ENDCASE
    $)
  $)

  LET START() BE $(
    LET queue = getvec(3)
    queue!0 = CreateRuneCommand(RUNE_OBLITERATE, 404)
    queue!1 = CreateRuneCommand(RUNE_REJUVENATE, 101)
    
    writef("Executing forbidden runes...*n")
    ExecuteCommand(queue!0)
    ExecuteCommand(queue!1)

    freevec(queue!0)
    freevec(queue!1)
    freevec(queue)
  $)
tags: [command, runes, void]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
