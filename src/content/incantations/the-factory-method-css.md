---
title: Factory Method
description: Let subclasses decide which styles to instantiate using BEM modifiers for varied elemental iterations.
type: css
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Subclass Instantiation"
formula: |2
  /* Base factory definitions */
  .ward-shield {
    border-radius: 50%;
    opacity: 0.8;
    display: inline-block;
    padding: 2rem;
  }
  
  /* Fire elemental factory method */
  .ward-shield--fire {
    background: radial-gradient(circle, red, orange);
    box-shadow: 0 0 10px red;
  }
  
  /* Frost elemental factory method */
  .ward-shield--frost {
    background: radial-gradient(circle, blue, cyan);
    box-shadow: 0 0 10px blue;
  }
tags: [css, bem, modifiers, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

With the Factory Method in CSS (commonly structured via BEM modifiers), the base block provides the structure, while the modifier "subclasses" determine the specific visual instantiation.
