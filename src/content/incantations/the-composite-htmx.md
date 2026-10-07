---
title: The Composite (Nested Fragments)
description: Treating individual hypermedia fragments and complex compositions of fragments uniformly.
type: htmx
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Conjuration // Amalgamation"
formula: |2
  <!-- A node that can render itself and recursively request its children -->
  <ul class="directory-tree">
    <li class="tree-node">
      <span hx-get="/api/tree/node/alpha/children" 
            hx-target="next ul" 
            hx-swap="innerHTML"
            hx-trigger="click">
        [+] Sector Alpha
      </span>
      <ul class="children-container">
        <!-- Child composite nodes will be summoned here -->
      </ul>
    </li>
  </ul>
tags: [htmx, composite, tree, recursion, lazy-loading]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The **Composite** pattern allows clients to treat individual objects and compositions of objects uniformly. In hypermedia, this often manifests as recursive or hierarchical structures like file trees, nested comments, or organizational charts.

Through lazy-loading, a parent node can summon its children using an `hx-get` request. The server returns fragments that are functionally identical to the parent—containing their own child containers and their own triggers to fetch deeper levels. The HTMX engine processes these nested spells seamlessly, allowing infinite fractal expansion of the DOM without complex client-side recursive loops.
