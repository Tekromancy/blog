---
title: The Strategy of the Void Tactician
description: Hot-swap the algorithms of warfare without disturbing the underlying spell matrix.
type: bcpl
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Tactics"
formula: |2
  GET "libhdr"

  LET StrategyAggressive(enemyHP) = enemyHP - 50
  LET StrategyDefensive(enemyHP) = enemyHP - 10
  LET StrategyVampiric(enemyHP) = enemyHP - 25 // Also heals, omitted for brevity

  LET ExecuteStrike(strategy, enemyHP) = VALOF $(
    writef("Striking with tactical mastery...*n")
    RESULTIS strategy(enemyHP)
  $)

  LET START() BE $(
    LET hp = 100
    writef("Enemy HP: %d*n", hp)
    
    hp := ExecuteStrike(StrategyDefensive, hp)
    writef("Enemy HP after defensive strike: %d*n", hp)

    hp := ExecuteStrike(StrategyAggressive, hp)
    writef("Enemy HP after aggressive strike: %d*n", hp)
  $)
tags: [strategy, tactics, void]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
