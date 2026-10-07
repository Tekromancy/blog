---
title: Decorator
description: Attach additional responsibilities to an object dynamically via pseudo-elements.
type: css
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Illusion // Ethereal Attachments"
formula: |2
  .enchanted-text {
    position: relative;
    display: inline-block;
  }
  
  /* Adding a glowing aura dynamically without changing the base element */
  .enchanted-text::before {
    content: '';
    position: absolute;
    inset: -5px;
    border: 2px solid cyan;
    filter: blur(4px);
    z-index: -1;
    border-radius: inherit;
  }
tags: [css, pseudo-elements, enhancement, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Using pseudo-elements (`::before`, `::after`), the Decorator pattern adds complex visual flairs (shadows, auras, borders) without bloating the HTML structure.
