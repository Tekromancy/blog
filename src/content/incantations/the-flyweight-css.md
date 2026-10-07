---
title: Flyweight
description: Share common style properties to reduce CSS payload and memory usage.
type: css
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Memory Compression"
formula: |2
  /* Intrinsic flyweight state shared across many elements */
  .text-center { text-align: center; }
  .margin-auto { margin: 0 auto; }
  .hidden { display: none !important; }
  .flex-center { display: flex; align-items: center; justify-content: center; }
  
  /* Reusing common magical properties rather than repeating them in every component */
tags: [css, optimization, sharing, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Flyweight pattern mirrors utility classes. By extracting shared, repetitive style rules into singular reusable classes, the overall size of the spellbook (CSS file) is drastically minimized.
