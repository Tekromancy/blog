---
title: Proxy (Forth)
description: Guard the deep invocations with conditional gateways.
type: forth
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Gatekeeping"
formula: |2
  \ Gatekeeping: The Proxy
  \ Protecting or deferring expensive/dangerous operations.

  VARIABLE MANA-POOL
  10 MANA-POOL !

  : REAL-DOOMSDAY ( -- )
    ." THE HEAVENS TEAR APART!" CR ;

  \ The Proxy
  : CAST-DOOMSDAY ( -- )
    MANA-POOL @ 100 < IF
      ." FIZZLE: Not enough mana for Doomsday." CR
    ELSE
      REAL-DOOMSDAY
    THEN ;

  \ Usage:
  \ CAST-DOOMSDAY
tags: [structural, proxy, forth, gatekeeping]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Some spells are too destructive to run unchecked. The Proxy acts as an intermediary word that performs access control, lazy evaluation, or constraint checks before passing the execution token forward to the true, deep invocation.
