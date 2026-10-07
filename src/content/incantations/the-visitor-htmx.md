---
title: The Visitor (Contextual Swaps)
description: Applying new operations to existing DOM structures by targeting them externally via OOB swaps.
type: htmx
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Enchantment // External-Influence"
formula: |2
  <!-- The Element structure, static and unaware of the Visitor -->
  <div id="hero-stats" class="stats-block">
    <span class="str">STR: 10</span>
    <span class="agi">AGI: 15</span>
  </div>

  <!-- A separate action triggers a buff (The Visitor) -->
  <button hx-post="/api/cast/bless" hx-swap="none">
    Cast Blessing
  </button>

  <!-- Server responds with an OOB payload that visits and alters the stats -->
  <!-- 
  <div id="hero-stats" hx-swap-oob="true" class="stats-block buffed">
    <span class="str">STR: 15 (+5)</span>
    <span class="agi">AGI: 20 (+5)</span>
    <div class="aura">Holy Aura Active</div>
  </div> 
  -->
tags: [htmx, visitor, oob-swap, cross-cutting-concerns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The **Visitor** pattern represents an operation to be performed on the elements of an object structure, letting you define a new operation without changing the classes of the elements. In HTMX, this manifests powerfully via `hx-swap-oob="true"` (Out-of-Band swaps).

The `hero-stats` block does not contain the logic for applying buffs or debuffs to itself. It is merely a structure. When an external action occurs (casting a blessing), the server generates a response that *visits* the `hero-stats` ID. The OOB swap forcibly injects new logic, classes, and data into the existing structure. This allows cross-cutting concerns (like global status effects, themes, or alerts) to operate on DOM nodes externally, keeping the core elements clean and unburdened by every possible mutation.
