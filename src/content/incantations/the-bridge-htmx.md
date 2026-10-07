---
title: The Bridge (Decoupled Interactions)
description: Separating the trigger mechanism from the target manifestation area using HTMX events.
type: htmx
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Enchantment // Linkage"
formula: |2
  <!-- The Trigger (Abstraction) -->
  <nav class="sidebar-runes">
    <button hx-get="/api/view/nexus" hx-target="#main-view">Nexus</button>
    <button hx-get="/api/view/forge" hx-target="#main-view">Forge</button>
  </nav>

  <!-- The Target (Implementation) -->
  <main id="main-view" class="view-portal">
    <!-- The manifestations appear here, decoupled from their triggers -->
    <p>Select a rune to begin.</p>
  </main>
tags: [htmx, bridge, decoupling, navigation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The **Bridge** pattern decouples an abstraction from its implementation so that the two can vary independently. In HTMX, this is achieved by decoupling the *trigger* element from the *target* element via the `hx-target` attribute.

The sidebar runes (the triggers) are completely separated from the central viewing portal. You can change the layout of the sidebar, alter the button types to select dropdowns, or move them to a completely different part of the DOM, and as long as they point to `#main-view`, the bridge remains intact. The spatial linkage is maintained by arcane targeting rather than nested hierarchies.
