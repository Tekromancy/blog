---
title: Memento (Forth)
description: Snapshot the stack state to cheat death itself.
type: forth
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // Time-Weaving"
formula: |2
  \ Time-Weaving: The Memento
  \ Saving and restoring variables or stack depth.

  VARIABLE TIMELINE-HP
  VARIABLE SAVED-HP

  : SET-HP ( n -- ) TIMELINE-HP ! ;

  : SAVE-TIMELINE ( -- )
    TIMELINE-HP @ SAVED-HP !
    ." Timeline preserved." CR ;

  : RESTORE-TIMELINE ( -- )
    SAVED-HP @ TIMELINE-HP !
    ." Time reversed. HP restored." CR ;

  \ Usage:
  \ 100 SET-HP SAVE-TIMELINE
  \ 0 SET-HP   \ Death!
  \ RESTORE-TIMELINE
tags: [behavioral, memento, forth, time-magic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Memento pattern allows the adept to snapshot an object's internal state. In Forth, this is the literal capturing of `VARIABLE`s or entire blocks of memory, locking the timeline away so it can be restored when the ritual inevitably goes wrong.
