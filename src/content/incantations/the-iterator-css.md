---
title: Iterator
description: Traverse a collection of elements sequentially using pseudo-classes.
type: css
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Conjuration // Sequential Phasing"
formula: |2
  /* Iterating through list items to create a staggered entrance animation */
  .rune-list li {
    opacity: 0;
    animation: fade-in 0.5s forwards;
  }
  
  .rune-list li:nth-child(1) { animation-delay: 0.1s; }
  .rune-list li:nth-child(2) { animation-delay: 0.2s; }
  .rune-list li:nth-child(3) { animation-delay: 0.3s; }
  .rune-list li:nth-child(4) { animation-delay: 0.4s; }
  
  @keyframes fade-in {
    to { opacity: 1; transform: translateY(0); }
  }
tags: [css, pseudo-classes, animation, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Iterator pattern in CSS relies heavily on `:nth-child()` or `:nth-of-type()`. It gracefully steps through elements in a structural array, assigning sequential properties like animation delays.
