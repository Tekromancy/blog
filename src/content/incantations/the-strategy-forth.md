---
title: Strategy (Forth)
description: Hot-swap your combat algorithms on the execution stack.
type: forth
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Battle-Calculation"
formula: |2
  \ Battle-Calculation: The Strategy
  \ Passing the algorithm (XT) as a parameter.

  : SLASH ( -- ) ." Slashing with void-blade!" CR ;
  : PIERCE ( -- ) ." Piercing with aether-lance!" CR ;

  : EXECUTE-ATTACK ( xt -- )
    ." Preparing strike... " EXECUTE ;

  \ Usage:
  \ ' SLASH EXECUTE-ATTACK
  \ ' PIERCE EXECUTE-ATTACK
tags: [behavioral, strategy, forth, tactics]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Why hardcode the algorithm when the battlefield is ever-shifting? The Strategy pattern allows you to define multiple distinct algorithms and pass their Execution Tokens (`XT`s) on the stack. The host execution logic simply consumes the `XT`, remaining wholly ignorant of the specific spell cast.
