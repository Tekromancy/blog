---
title: Builder
description: Construct complex styles step-by-step using utility classes to incrementally assemble a complete spell ward.
type: css
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Incremental Construction"
formula: |2
  /* Base structural rune */
  .ward-base { 
    display: block; 
    padding: 1rem; 
    border-radius: 4px;
  }
  
  /* Border inscription builder step */
  .ward-bordered { 
    border: 2px solid gold; 
  }
  
  /* Illumination builder step */
  .ward-glowing { 
    box-shadow: 0 0 15px gold; 
  }
  
  /* Applied in HTML: class="ward-base ward-bordered ward-glowing" */
tags: [css, utility-classes, composition, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Builder pattern in CSS aligns perfectly with utility-first or composition-based styling methodologies. Rather than writing monolithic monolithic classes, you assemble the final ward sequentially through multiple small classes.
