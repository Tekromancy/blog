---
title: The State of Snobol
description: Shifting behavior as the phases of the moon change.
type: snobol
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Phase Shifting"
formula: |2
          * State Pattern in SNOBOL4
          DEFINE('CAST_PHASE()')

          PHASE = 'WAXING'
          CAST_PHASE()
          PHASE = 'FULL'
          CAST_PHASE()
          :(END)

  CAST_PHASE
          IDENT(PHASE, 'WAXING') :S(PHASE_W)
          IDENT(PHASE, 'FULL') :S(PHASE_F)
          :(RETURN)

  PHASE_W OUTPUT = 'Weak magic flows.' :(RETURN)
  PHASE_F OUTPUT = 'Maximum power unleashed!' :(RETURN)
  END
tags: [snobol, behavioral, state]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The State pattern dynamically changes the outcome of a spell based on an external state variable, such as the phase of the moon. The spell branches internally, providing different manifestations.
