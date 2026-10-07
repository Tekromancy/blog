---
title: Proxy
description: Provide a surrogate or placeholder, such as a skeleton screen, until the true content manifests.
type: css
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Illusion // Phantom Replacements"
formula: |2
  /* Proxy skeleton before the true arcane knowledge is loaded */
  .ward-proxy {
    background: linear-gradient(90deg, #333 25%, #444 50%, #333 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite linear;
    min-height: 100px;
    border-radius: 4px;
    pointer-events: none;
  }
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
tags: [css, skeleton, loading, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Proxy pattern provides a temporary visual illusion of structure, easing the user's perception while waiting for asynchronous magical data streams to complete loading.
