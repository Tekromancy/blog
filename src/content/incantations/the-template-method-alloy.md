---
title: "The Template Method: The Skeleton Ritual"
description: "Define the skeleton of an algorithm in an operation, deferring some steps to subclasses."
type: alloy
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Necromancy // Skeleton-Ritual"
formula: |2
  abstract sig RitualFramework {
    invocation: one SpellPhase,
    climax: one SpellPhase
  }
  
  sig FireRitual extends RitualFramework {}
  sig VoidRitual extends RitualFramework {}
  
  sig SpellPhase {}
  
  fact "Phases Are Distinct" {
    all r: RitualFramework | r.invocation != r.climax
  }
  
  run {} for 4
tags: [behavioral, template method, framework]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Template Method: The Skeleton Ritual

The `RitualFramework` dictates the mandatory sequence of the arcane arts: an `invocation` followed by a `climax`. Concrete subclasses like `FireRitual` inherit this exact skeleton. The fact `Phases Are Distinct` ensures the ritual does not accidentally overlap its own temporal constraints.
