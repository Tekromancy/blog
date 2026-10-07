---
title: The Chain of Responsibility Incantation
description: Passing stack operations along a sequence of color handlers in Piet.
type: piet
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Evocation // Chromatic Sorcery"
formula: |2
  // Piet chain of responsibility representation:
  // - Handlers: A sequence of connected horizontal color blocks.
  // - Request: A value sitting at the top of the stack.
  // - Handling: Each block checks if it matches a criteria (using subtract/not/pointer).
  // - Propagation: If not handled, DP is directed rightward to the next block.
tags: [behavioral, chain-of-responsibility, piet]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Chain of Responsibility threads execution through a gauntlet of logic nodes. As the pointer slides horizontally across the canvas, each colored handler examines the stack. If it cannot process the request, it passes the flow to its neighbor, ensuring every spell finds its mark.
