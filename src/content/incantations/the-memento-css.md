---
title: Memento
description: Capture and restore an object's internal state using CSS variables and interactive pseudo-classes.
type: css
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // State Recall"
formula: |2
  /* Defining the initial state logic */
  .ethereal-button {
    --current-bg: var(--original-bg, #333);
    background: var(--current-bg);
    transition: background 0.2s;
  }
  
  /* Modifying state temporarily */
  .ethereal-button:active {
    --current-bg: #fff;
    color: #000;
  }
  
  /* Reverting to the saved memento automatically via CSS */
  .ethereal-button:not(:active) {
    /* State reverts seamlessly */
  }
tags: [css, variables, pseudo-classes, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

By anchoring original states to fallback variables, the Memento pattern allows elements to temporarily morph during `:active` or `:focus`, reverting flawlessly when the state is removed.
