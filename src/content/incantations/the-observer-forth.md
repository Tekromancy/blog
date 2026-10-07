---
title: Observer (Forth)
description: Bind familiars to watch the shifting of the aether.
type: forth
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: Divination // Familiar-Binding
formula: |
  \ Familiar-Binding: The Observer
  \ A list of XTs invoked upon state change.
  
  CREATE FAMILIARS 10 CELLS ALLOT
  VARIABLE FAMILIAR-COUNT  0 FAMILIAR-COUNT !
  
  : WATCH ( xt -- )
    FAMILIAR-COUNT @ CELLS FAMILIARS + !
    1 FAMILIAR-COUNT +! ;
    
  : NOTIFY-ALL ( -- )
    FAMILIAR-COUNT @ 0 ?DO
      I CELLS FAMILIARS + @ EXECUTE
    LOOP ;
    
  : IMP-WATCHER ( -- ) ." Imp notices a shift in power!" CR ;
  : RAVEN-WATCHER ( -- ) ." Raven caws at the anomaly!" CR ;
  
  \ Usage:
  \ ' IMP-WATCHER WATCH
  \ ' RAVEN-WATCHER WATCH
  \ NOTIFY-ALL
tags: [behavioral, observer, forth, familiars]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

To avoid endlessly polling the void for updates, we use the Observer pattern. By pushing the Execution Tokens of multiple watchers into an array, a single state change can fire a `NOTIFY-ALL` word, triggering every bound familiar simultaneously.
