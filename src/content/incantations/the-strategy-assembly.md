---
title: The Strategy
description: Swapping out the combat algorithms of an undead warlord on the fly.
type: assembly
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: Necromancy // Combat Tactics
formula: |
  section .data
      combat_strategy dq strat_defend
  
  section .text
      global execute_combat
  
  execute_combat:
      mov rax, [combat_strategy]
      jmp rax
  
  strat_defend:
      ; Shield wall logic
      ret
      
  strat_attack:
      ; Charge logic
      ret
tags: [strategy, assembly, behavioral, necromancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Strategy pattern defines a family of interchangeable algorithms. Encapsulated as distinct function blocks and bound to a dynamic pointer, the warlord's mind can pivot from iron defense to ruthless assault in a single cycle.
