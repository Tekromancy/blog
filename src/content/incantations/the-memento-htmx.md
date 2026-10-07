---
title: The Memento (History Pushing)
description: Capturing and restoring internal state via URL synchronization and the browser's history API.
type: htmx
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // Restoration"
formula: |2
  <!-- HTMX allows saving the current state to the browser history via hx-push-url -->
  <nav class="archive-filters">
    <button hx-get="/api/archive?type=spells" 
            hx-target="#archive-content"
            hx-push-url="/archive/spells">
      View Spells
    </button>
    
    <button hx-get="/api/archive?type=potions" 
            hx-target="#archive-content"
            hx-push-url="/archive/potions">
      View Potions
    </button>
  </nav>

  <main id="archive-content">
    <!-- Content loads here. Pressing the back button restores the previous HTML state. -->
  </main>
tags: [htmx, memento, history-api, routing, chronomancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The **Memento** pattern captures and externalizes an object's internal state so it can be restored later. HTMX provides a powerful, built-in Memento system using the `hx-push-url` attribute, tying directly into the browser's native History API.

When a user navigates between different filters or views, `hx-push-url` records the current state of the DOM and updates the address bar. If the user invokes Chronomancy (pressing the browser's "Back" button), HTMX automatically intercepts the event and restores the exact HTML snapshot from its internal cache. The previous state is resurrected instantly without needing to re-query the server, effectively reversing time.
