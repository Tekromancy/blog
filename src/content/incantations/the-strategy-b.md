---
title: "The Strategy"
description: "Swapping out the foundational precursor algorithms at runtime."
type: b
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Tactics"
formula: |2
  /* Strategies are raw function pointers passed into the executor */

  strat_aggressive(target) {
      putchar('A'); putchar('T'); putchar('K');
  }

  strat_defensive(target) {
      putchar('D'); putchar('E'); putchar('F');
  }

  execute_tactic(strat, target) {
      /* Dynamic strategy invocation */
      strat(target);
  }

  battle_plan() {
      execute_tactic(strat_aggressive, 'E');
      execute_tactic(strat_defensive, 'M');
  }
tags: [b, design-pattern, precursor, bell-labs-magic, untyped]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
