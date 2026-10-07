---
title: Singleton
description: A styling ward that should only exist once per page, like the body or a unique ID-based container.
type: css
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Evocation // Singular Manifestation"
formula: |2
  /* Singleton instance of the prime ward */
  #omni-ward-core {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9999;
    background: radial-gradient(circle, transparent 70%, rgba(0, 0, 0, 0.8) 100%);
  }
tags: [css, ids, uniqueness, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

In CSS, the Singleton is naturally represented by the ID selector (`#`). It enforces that the styles are uniquely bound to a single element within the document object model, creating a singular focal point for the ward.
