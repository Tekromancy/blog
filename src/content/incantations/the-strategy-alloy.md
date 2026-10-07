---
title: "The Strategy: The Algorithmic Grimoire"
description: "Define a family of algorithms, encapsulate each one, and make them interchangeable."
type: alloy
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Tactics-Weaving"
formula: |2
  abstract sig TacticalSpell {
    yield: lone ExecutionTrace
  }
  
  sig BruteForceSpell, StealthInjectionSpell extends TacticalSpell {}
  
  sig CombatNode {
    activeSpell: one TacticalSpell,
    result: lone ExecutionTrace
  }
  {
    result = activeSpell.yield
  }
  
  sig ExecutionTrace {}
  
  pred engage_node[n: CombatNode] {
    some n.result
  }
  
  run engage_node for 3
tags: [behavioral, strategy, tactics]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Strategy: The Algorithmic Grimoire

Though identical in structure to the State pattern within a static snapshot, the Intent is different. The `CombatNode` selects a `TacticalSpell` from its grimoire, swapping its computational approach. Alloy verifies that regardless of the spell chosen, the `ExecutionTrace` flows correctly.
