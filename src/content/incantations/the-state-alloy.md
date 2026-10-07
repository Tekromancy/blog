---
title: "The State: Fluid Paradigms"
description: "Allow an object to alter its behavior when its internal state changes."
type: alloy
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Paradigm-Shift"
formula: |2
  abstract sig Paradigm {
    manifestation: lone RealityWarp
  }
  
  sig CyberParadigm, AstralParadigm extends Paradigm {}
  
  sig SentientConstruct {
    currentParadigm: one Paradigm,
    output: lone RealityWarp
  }
  {
    output = currentParadigm.manifestation
  }
  
  sig RealityWarp {}
  
  pred execute_shift[c: SentientConstruct] {
    some c.output
  }
  
  run execute_shift for 3
tags: [behavioral, state, polymorphism]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The State: Fluid Paradigms

A `SentientConstruct` behaves radically differently depending on its `currentParadigm`. By constraining the construct's `output` to directly match the `manifestation` of its internal state, we define a perfectly polymorphic entity governed entirely by its inner alignment.
