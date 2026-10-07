---
title: The Adapter (Hypermedia Wrapper)
description: Wrapping incompatible legacy APIs in HTML facades for seamless HTMX consumption.
type: htmx
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Translation"
formula: |2
  <!-- The client expects pure HTML, but the backend is a legacy JSON REST API. -->
  <!-- The Adapter is a middleware endpoint that performs the translation. -->
  <div class="ancient-terminal" 
       hx-get="/adapter/legacy/user/101" 
       hx-trigger="load">
    Decrypting legacy data streams...
  </div>
tags: [htmx, adapter, bff, middleware, hypermedia]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The **Adapter** pattern is vital when weaving modern hypermedia spells over ancient, decaying JSON architectures. HTMX demands HTML, but the abyss often speaks in JSON. 

The Hypermedia Adapter (often implemented as a Backend-For-Frontend or BFF) intercepts the `hx-get` request. It ventures into the dark API, retrieves the JSON data, and parses it through a templating engine. It then returns the fully formed HTML payload to the client. The HTMX layer is completely shielded from the legacy protocols, interacting only with the pristine HTML interface provided by the Adapter.
