---
title: Strategy
description: Define a family of algorithms (layouts) and make them interchangeable via discrete structural classes.
type: css
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Formation Tactics"
formula: |2
  /* Strategy 1: Flexbox alignment */
  .strategy-flex { 
    display: flex; 
    gap: 1rem; 
    align-items: center;
  }
  
  /* Strategy 2: Grid matrix */
  .strategy-grid { 
    display: grid; 
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); 
    gap: 1.5rem;
  }
  
  /* Strategy 3: Multi-column manuscript */
  .strategy-columns { 
    column-count: 2; 
    column-gap: 2rem; 
    column-rule: 1px solid #333;
  }
tags: [css, layout, architecture, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Layout strategies in CSS allow you to plug and play algorithmic formatting methods. Swapping the strategy class completely reflows the internal structure of the document without altering the HTML.
