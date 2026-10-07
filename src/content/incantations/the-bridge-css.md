---
title: Bridge
description: Decouple layout structures from their decorative themes, allowing both to vary independently.
type: css
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Conjuration // Decoupled Matrices"
formula: |2
  /* Layout Ward (Abstraction) */
  .grid-matrix {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
  
  /* Visual Theme Ward (Implementation) */
  .theme-astral {
    background: midnightblue;
    color: ghostwhite;
  }
  
  .theme-astral .grid-cell {
    border: 1px solid silver;
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
  }
tags: [css, layout, decoupling, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Bridge pattern in CSS involves keeping structural grid/flex layout classes completely separated from color, typography, and visual theme classes, ensuring complete modularity.
