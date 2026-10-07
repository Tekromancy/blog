---
title: Adapter
description: Wrap legacy or incompatible markup with a modern styling context.
type: css
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Structural Rebinding"
formula: |2
  /* Adapting an ancient HTML table into a modern flex-based spellbook grid */
  .spellbook-adapter table {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  
  .spellbook-adapter tbody {
    display: contents;
  }
  
  .spellbook-adapter tr {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
tags: [css, layout, compatibility, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Adapter pattern acts as a wrapper class that intercepts legacy HTML structures and morphs their display properties to match modern, arcane aesthetic layouts.
