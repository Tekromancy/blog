---
title: "The Flyweight: The Essence Pool"
description: "Use sharing to support large numbers of fine-grained objects efficiently."
type: alloy
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Essence-Pooling"
formula: |2
  sig IntrinsicEssence {}
  
  abstract sig SpellConstruct {
    essence: one IntrinsicEssence
  }
  
  sig SharedSpell extends SpellConstruct {}
  
  one sig SpellPool {
    spells: set SharedSpell
  }
  
  fact "Enforce Maximum Sharing" {
    all s1, s2: SpellPool.spells |
      (s1 != s2) implies (s1.essence != s2.essence)
  }
  
  run {} for 4
tags: [structural, flyweight, optimization]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

# The Flyweight: The Essence Pool

When thousands of spells must be cast, memory is a premium even in the ethereal void. The `SpellPool` holds `SharedSpell` constructs. The fact `Enforce Maximum Sharing` ensures that no two flyweights in the pool share the same intrinsic essence; thus, the pool only contains unique essences, drastically culling the state space explored by the Alloy Analyzer.
