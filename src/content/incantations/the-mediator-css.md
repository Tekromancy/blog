---
title: Mediator
description: Centralize complex communications between elements using a parent container and combinators.
type: css
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Abjuration // Harmonized Hubs"
formula: |2
  /* The parent container acts as a mediator for its children */
  .ritual-circle:hover > .rune {
    opacity: 0.3; /* Dim all runes when the circle is active */
    transition: opacity 0.3s ease;
  }
  
  /* The mediator ensures only the focused element shines */
  .ritual-circle > .rune:hover {
    opacity: 1;
    transform: scale(1.2) translateY(-10px);
    z-index: 10;
  }
tags: [css, combinators, interaction, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Mediator pattern leverages parent states to orchestrate complex interactions among siblings. Instead of sibling logic, the central parent dictates the behavioral flow when interaction occurs.
