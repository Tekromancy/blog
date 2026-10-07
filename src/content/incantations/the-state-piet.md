---
title: The State Incantation
description: Altering execution behavior based on internal stack transitions in Piet.
type: piet
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Chromatic Sorcery"
formula: |2
  // Piet state representation:
  // - Context: The global loop structure.
  // - State: A singular value kept at the very bottom of the stack.
  // - Transition: Operations that alter this bottom value.
  // - Behavior: The main loop branches drastically differently based on the state value.
tags: [behavioral, state, piet]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The State pattern allows a Piet construct to morph its very nature. By anchoring a state variable at the root of the stack, the overarching control loop can shift its routing dynamically, seemingly altering the canvas's class at runtime.
