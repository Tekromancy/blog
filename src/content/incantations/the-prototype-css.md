---
title: Prototype
description: Clone existing style objects utilizing native CSS class chaining or preprocessor extensions to copy base styles.
type: css
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Duplication"
formula: |2
  /* The original prototype rune */
  .base-rune {
    font-family: 'Arcane', sans-serif;
    letter-spacing: 2px;
    font-weight: bold;
  }
  
  /* Cloning the base rune in standard CSS via multi-classing */
  /* HTML: class="base-rune cloned-rune" */
  .cloned-rune {
    color: purple;
    /* Unique additions to the prototype */
  }
tags: [css, cloning, inheritance, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

CSS Prototype patterns involve defining a master class as the template and applying it alongside mutator classes to create cloned, slightly modified variants.
