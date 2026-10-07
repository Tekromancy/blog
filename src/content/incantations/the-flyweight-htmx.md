---
title: The Flyweight (CSS/JS Asset Management)
description: Sharing intrinsic state (styles/scripts) efficiently across multiple spawned hypermedia elements.
type: htmx
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Efficiency"
formula: |2
  <!-- Intrinsic state: The shared styles are loaded once in the head. -->
  <head>
    <link rel="stylesheet" href="/styles/cyber-grid.css">
  </head>

  <!-- Extrinsic state: The unique data is delivered via HTMX. -->
  <div class="cyber-grid" hx-get="/api/grid/data" hx-trigger="every 5s">
    <!-- Server sends lightweight HTML without inline styles: -->
    <!-- <div class="cell bg-neon">Data Node A</div> -->
    <!-- <div class="cell bg-void">Data Node B</div> -->
  </div>
tags: [htmx, flyweight, optimization, performance]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The **Flyweight** pattern minimizes memory usage by sharing as much data as possible with similar objects. In HTMX, this translates directly to separating **intrinsic state** (CSS classes and external JS logic) from **extrinsic state** (the raw data and HTML structure).

When summoning massive grids or lists, the server must not bloat the response with inline styles or repetitive `<script>` blocks. Instead, the CSS acts as the shared Flyweight. The server returns only the bare minimum semantic HTML annotated with shared class names (`class="cell bg-neon"`). The client browser efficiently applies the shared rules, allowing thousands of elements to be rendered and updated with minimal arcane payload overhead.
