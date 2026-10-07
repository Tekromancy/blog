---
title: The State of the Shifting Monolith
description: Alter the monolith's behavior profoundly as its internal dimensional phase changes.
type: bcpl
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Phase-Shifting"
formula: |2
  GET "libhdr"

  MANIFEST $(
    PHASE_DORMANT = 1
    PHASE_ACTIVE = 2
    PHASE_OVERLOAD = 3
  $)

  GLOBAL $(
    MonolithPhase : 230
  $)

  LET Interact() BE $(
    SWITCHON MonolithPhase INTO $(
      CASE PHASE_DORMANT:
        writef("The monolith is cold and silent. Touching it awakens it.*n")
        MonolithPhase := PHASE_ACTIVE
        ENDCASE
      CASE PHASE_ACTIVE:
        writef("The monolith hums with void energy. Touching it overloads it!*n")
        MonolithPhase := PHASE_OVERLOAD
        ENDCASE
      CASE PHASE_OVERLOAD:
        writef("The monolith discharges violently! It returns to slumber.*n")
        MonolithPhase := PHASE_DORMANT
        ENDCASE
    $)
  $)

  LET START() BE $(
    MonolithPhase := PHASE_DORMANT
    Interact()
    Interact()
    Interact()
    Interact()
  $)
tags: [state, phases, void]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
