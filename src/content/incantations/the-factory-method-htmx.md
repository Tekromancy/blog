---
title: The Factory Method (Content Negotiation)
description: Delegating the instantiation of hypermedia fragments to specialized server endpoints.
type: htmx
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Delegation"
formula: |2
  <!-- The client specifies the type of data it needs, the server decides the HTML representation. -->
  <div class="data-nexus">
    <button hx-post="/api/query/artifacts" 
            hx-vals='{"type": "weaponry"}'
            hx-target="#artifact-display">
      Query Weaponry
    </button>
    <button hx-post="/api/query/artifacts" 
            hx-vals='{"type": "runes"}'
            hx-target="#artifact-display">
      Query Runes
    </button>
  </div>
  
  <div id="artifact-display">
    <!-- Factory method response injects the appropriate table or list here -->
  </div>
tags: [htmx, factory-method, hypermedia, polymorphism]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The **Factory Method** in a hypermedia system relies on parameterized endpoints. The client issues a generalized command (`/api/query/artifacts`) and provides a specific context (`type: weaponry`). It relies on the server's internal logic to invoke the correct sub-routine and generate the specialized HTML fragment.

By delegating the structure to the server, the DOM remains lightweight. The client acts as a mere conduit, allowing polymorphic components to be rendered seamlessly into the `#artifact-display` zone without needing complex client-side templating logic.
