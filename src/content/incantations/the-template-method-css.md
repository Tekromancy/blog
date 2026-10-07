---
title: Template Method
description: Define the skeleton of an algorithm, deferring some steps to subclasses using CSS variables with defaults.
type: css
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Conjuration // Skeleton Frameworks"
formula: |2
  /* Template Method defined with default variable fallbacks */
  .ward-template {
    padding: var(--ward-pad, 1rem);
    background: var(--ward-bg, #111);
    border: var(--ward-border, 1px solid #444);
    border-radius: var(--ward-radius, 8px);
    color: var(--ward-text, #eee);
  }
  
  /* Subclass filling in the specific deferred steps */
  .ward-blood {
    --ward-bg: #2a0000;
    --ward-border: 2px dashed crimson;
    --ward-text: #ff9999;
  }
tags: [css, custom-properties, theming, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

By providing a highly structured CSS class populated entirely by variables with robust default values, the Template Method acts as a powerful scaffolding system for limitless thematic variations.
