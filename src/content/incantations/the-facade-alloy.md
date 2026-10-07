---
title: "The Facade: The High Council's Veil"
description: "Provide a unified interface to a set of interfaces in a subsystem."
type: alloy
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // Veil-Crafting"
formula: |2
  sig CyberNet { ping: lone Signal }
  sig AstralPlane { projection: lone Signal }
  sig MeatSpace { action: lone Signal }
  
  one sig TheVeilFacade {
    cyber: one CyberNet,
    astral: one AstralPlane,
    meat: one MeatSpace,
    omniSignal: set Signal
  }
  {
    omniSignal = cyber.ping + astral.projection + meat.action
  }
  
  sig Signal {}
  
  pred trigger_omni {
    some TheVeilFacade.omniSignal
  }
  
  run trigger_omni for 3
tags: [structural, facade, simplification]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Facade: The High Council's Veil

The Facade obscures the horrifying complexity of the underlying systems. `TheVeilFacade` acts as a Singleton orchestrator, pulling together the outputs of the `CyberNet`, `AstralPlane`, and `MeatSpace` into a single, unified `omniSignal`.
