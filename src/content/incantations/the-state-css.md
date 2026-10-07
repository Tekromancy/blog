---
title: State
description: Allow an element to alter its behavior when its internal state changes, using pseudo-classes.
type: css
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Conditional Metamorphosis"
formula: |2
  /* Different states of a physical ward */
  .ward-gate { 
    border: 2px solid #555; 
    transition: all 0.2s;
  }
  
  .ward-gate:hover { 
    border-color: #fff; 
    box-shadow: 0 0 8px #fff;
  }
  
  .ward-gate:focus-within { 
    outline: 2px solid cyan; 
    background: rgba(0, 255, 255, 0.05);
  }
  
  .ward-gate:disabled,
  .ward-gate[aria-disabled="true"] { 
    opacity: 0.5; 
    cursor: not-allowed; 
    filter: grayscale(100%);
  }
tags: [css, states, accessibility, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The State pattern translates to CSS pseudo-classes and ARIA attribute selectors. Based purely on user interaction or scripted attribute shifts, the visual output transforms completely.
