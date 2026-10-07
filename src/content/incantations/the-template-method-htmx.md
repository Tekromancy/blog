---
title: The Template Method (Server-Side Layouts)
description: Defining the skeleton of an algorithm in a base template, deferring fragment rendering to HTMX requests.
type: htmx
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Illusion // Scaffolding"
formula: |2
  <!-- The initial page load provides the Template Method skeleton -->
  <div class="grand-hall">
    <header>Welcome to the Sanctum</header>
    
    <!-- These slots are deferred to be filled by specific implementations -->
    <aside hx-get="/api/layout/sidebar" hx-trigger="load"></aside>
    
    <main hx-get="/api/layout/primary-content" hx-trigger="load">
      <div class="skeleton-loader">Materializing content...</div>
    </main>
    
    <footer>Runes of Protection Active</footer>
  </div>
tags: [htmx, template-method, lazy-load, scaffolding, architecture]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The **Template Method** pattern defines the skeleton of an operation, deferring some steps to subclasses. In web architecture, this aligns with **Server-Side Layouts and Deferred Loading**.

The initial HTML document returned to the client acts as the overarching Template. It establishes the rigid layout (the header, the footer, the grid structure). However, the specific contents of the `<aside>` and `<main>` blocks are not provided immediately. Instead, they contain HTMX `hx-trigger="load"` directives. The browser immediately begins executing these deferred steps, querying the server to fill in the blanks. This creates an incredibly fast initial paint, while ensuring the complex sub-components are rendered dynamically.
