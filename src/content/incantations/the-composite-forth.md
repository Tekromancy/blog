---
title: Composite (Forth)
description: Treat the lone soul and the legion as one entity.
type: forth
gofPattern: Composite
gofCategory: Structural
arcaneSchool: Conjuration // Swarm-Logic
formula: |
  \ Swarm-Logic: The Composite
  \ A linked list or array of Execution Tokens (XTs).
  
  CREATE SWARM 10 CELLS ALLOT
  VARIABLE SWARM-COUNT
  0 SWARM-COUNT !
  
  : ADD-TO-SWARM ( xt -- )
    SWARM-COUNT @ CELLS SWARM + !
    1 SWARM-COUNT +! ;
    
  : COMMAND-SWARM ( -- )
    SWARM-COUNT @ 0 ?DO
      I CELLS SWARM + @ EXECUTE
    LOOP ;
    
  : SUMMON-RAT ( -- ) ." Squeak!" CR ;
  : SUMMON-BAT ( -- ) ." Flap!" CR ;
  
  \ Usage:
  \ ' SUMMON-RAT ADD-TO-SWARM
  \ ' SUMMON-BAT ADD-TO-SWARM
  \ COMMAND-SWARM
tags: [structural, composite, forth, swarms]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

To control a legion, one must issue a single command. The Composite stores arrays of Execution Tokens (`XT`s). Executing the composite word automatically unfolds across the recursive depths, triggering every chained entity.
