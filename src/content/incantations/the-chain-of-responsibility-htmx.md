---
title: The Chain of Responsibility (Event Bubbling)
description: Passing requests along a hierarchy of DOM nodes until a suitable handler intercepts them.
type: htmx
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Evocation // Cascading"
formula: |2
  <!-- The parent element establishes a chain to catch specific events -->
  <div class="command-center" hx-on:close-modal="this.querySelector('#modal-wrapper').innerHTML = ''">
    
    <!-- Intermediate node that ignores the event, letting it bubble up -->
    <div class="work-area">
      
      <!-- The triggering node emits a custom event to the chain -->
      <button hx-post="/api/save/draft"
              hx-target="#status"
              _="on htmx:afterRequest trigger close-modal">
        Save & Close
      </button>

    </div>
    
    <div id="modal-wrapper">...</div>
  </div>
tags: [htmx, hyperscript, event-bubbling, chain-of-responsibility]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The **Chain of Responsibility** is deeply native to the DOM through the mechanism of **Event Bubbling**. HTMX and Hyperscript leverage this extensively. When a spell is cast deep within the DOM hierarchy, the resulting energy (the event) bubbles upward.

If a child node cannot handle a specific lifecycle event or custom trigger (like `close-modal`), it simply allows the event to pass to its parent. The event ascends the chain until it strikes a node bearing the appropriate ward (like `hx-on:close-modal`). This prevents tight coupling; the child button doesn't need to know *how* or *where* to close the modal, only that it should shout into the void, trusting the chain to handle the request.
