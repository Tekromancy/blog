---
title: The Singleton (OOB Updates)
description: Maintaining a singular, globally accessible state manifestation in the DOM using Out-of-Band swaps.
type: htmx
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // State-Locking"
formula: |2
  <!-- The singular notification nexus, existing once in the layout. -->
  <div id="global-alert-nexus" hx-swap-oob="true">
    <!-- Messages broadcasted from any spell cast will appear here -->
  </div>

  <!-- A spell cast anywhere in the app can trigger an OOB update to the Singleton -->
  <button hx-post="/api/cast/fireball" hx-target="#local-target">
    Cast Fireball
  </button>
  
  <!-- Server response includes:
    <div id="local-target">Target scorched.</div>
    <div id="global-alert-nexus" hx-swap-oob="true">
      <div class="alert warning">Mana depleted by 50.</div>
    </div>
  -->
tags: [htmx, singleton, oob-swap, global-state]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In the hypermedia cosmos, a **Singleton** is an element that must exist as a singular, globally updated entity—such as a notification toaster, a shopping cart, or a player's health bar. Rather than tying the update of this element to complex client-side state managers, HTMX utilizes the arcane power of `hx-swap-oob="true"`.

When an action occurs anywhere in the application, the server can piggyback an update to the Singleton alongside the primary response. The client intercepts the OOB block and surgically updates the global element, ensuring the Singleton remains consistent and singularly synchronized without complex JavaScript plumbing.
