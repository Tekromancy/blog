---
title: The Command Incantation
description: Encapsulating operations as discrete color sub-routines in Piet.
type: piet
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Chromatic Sorcery"
formula: |2
  // Piet command representation:
  // - Invoker: A switch block interpreting user input.
  // - Command: Distinct isolated blocks (e.g., Red-Blue for addition, Green-Yellow for print).
  // - Encapsulation: The exact sequence of steps is wrapped tightly within its block.
  // - Execution: Routing DP to the command block and then back to the main loop.
tags: [behavioral, command, piet]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Command pattern crystallizes intent. It encapsulates complex operations into tight, distinct islands of color. The main execution flow simply routes the pointer to these islands based on commands, isolating the what from the how.
