---
title: The Mediator (Event Bus)
description: Decoupling complex element interactions by using HTMX events as a centralized communication nexus.
type: htmx
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Synchronization"
formula: |2
  <!-- The body acts as the Mediator (Event Bus) -->
  <body hx-on:item-updated="htmx.trigger('#inventory-stats', 'refresh')">
    
    <!-- Colleague 1: The trigger element -->
    <div class="forge">
      <button hx-post="/api/forge/upgrade"
              hx-target="#item-status"
              _="on htmx:afterRequest trigger item-updated">
        Upgrade Sword
      </button>
      <div id="item-status"></div>
    </div>

    <!-- Colleague 2: The reacting element, completely unaware of Colleague 1 -->
    <div class="sidebar">
      <div id="inventory-stats" 
           hx-get="/api/stats" 
           hx-trigger="refresh">
        Total Power: 9000
      </div>
    </div>
  </body>
tags: [htmx, mediator, event-bus, decoupling, coordination]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The **Mediator** pattern defines an object that encapsulates how a set of objects interact, promoting loose coupling. In HTMX, the DOM itself, combined with the event system, acts as the Mediator. 

When a button in the Forge updates an item, it doesn't need to know that the Inventory Stats sidebar exists. It simply emits an `item-updated` event into the aether. A higher-level DOM node (the Mediator) listens for this event and routes a new command to the sidebar, triggering its `refresh` event. This prevents chaotic, direct connections between disparate UI components, keeping the arcane circuitry clean and modular.
