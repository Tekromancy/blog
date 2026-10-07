---
title: Chain of Responsibility
description: Pass the request along a chain of selectors using the cascade and specificity.
type: css
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Divination // Cascading Checks"
formula: |2
  /* Chain of responsibility using CSS cascade and specificity */
  
  /* Base handler: minimal specificity */
  a { color: blue; text-decoration: none; } 
  
  /* Higher tier handler: context aware */
  .spell-book a { color: purple; border-bottom: 1px dotted purple; } 
  
  /* Specialized handler: interaction state */
  .spell-book a:hover { color: magenta; border-bottom-style: solid; } 
  
  /* Final override handler: absolute authority */
  .spell-book a.cursed { color: red !important; pointer-events: none; }
tags: [css, cascade, specificity, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The cascade inherently mimics the Chain of Responsibility. A style request falls through successive rules, gaining specificity until a final definition strictly overrides the rest.
