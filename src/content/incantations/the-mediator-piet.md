---
title: The Mediator Incantation
description: Centralizing complex cross-canvas communications in Piet.
type: piet
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Chromatic Sorcery"
formula: |2
  // Piet mediator representation:
  // - Colleagues: Distinct logic modules in the four corners of the canvas.
  // - Mediator: A central nexus hub of routing logic.
  // - Communication: Modules never link directly; they output a target ID and return to the hub.
  // - Routing: The hub reads the target ID and routes the DP accordingly.
tags: [behavioral, mediator, piet]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The Mediator is the heart of the arcane machine. Instead of a chaotic web of direct pointers crossing the entire image, all modules yield their flow back to a central hub. This hub evaluates the stack state and dictates the next destination, ensuring harmonious execution.
