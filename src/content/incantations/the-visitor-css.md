---
title: Visitor
description: Represent an operation to be performed on the elements of an object structure, using sibling combinators.
type: css
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Transmutation // External Manipulation"
formula: |2
  /* A visitor element interacts with adjacent elements without modifying their internal structure */
  .visitor-light:hover ~ .dark-rune {
    filter: brightness(200%) sepia(100%) hue-rotate(50deg);
    color: yellow;
    transition: filter 0.5s;
  }
  
  .visitor-shadow:active + .bright-sigil {
    opacity: 0.1;
    transform: scale(0.95);
  }
tags: [css, combinators, interaction, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Visitor pattern is perfectly emulated by the sibling combinators (`~` and `+`). The state of an external control node cascades changes through independent neighboring structures.
