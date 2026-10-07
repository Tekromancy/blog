---
title: The Builder (Progressive Disclosure)
description: Constructing complex hypermedia manifestations step-by-step using progressive HTMX forms.
type: htmx
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Synthesis"
formula: |2
  <!-- A multi-stage summoning ritual where each step builds upon the previous. -->
  <form id="golem-builder" hx-post="/api/build/golem/step-1" hx-target="#golem-builder" hx-swap="outerHTML">
    <fieldset class="cyber-ward">
      <legend>Select Core Material</legend>
      <input type="radio" name="material" value="obsidian"> Obsidian
      <input type="radio" name="material" value="chrome"> Chrome
    </fieldset>
    <button type="submit">Imbue Material & Continue</button>
  </form>
tags: [htmx, form-wizard, builder, state-machine]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The **Builder** pattern translates into hypermedia as the **Progressive Form** or Wizard. Rather than attempting to cast a complex spell with a thousand parameters at once, the artificer guides the user through sequential transmutations. 

Each `hx-post` operation submits a fragment of the ultimate incantation. The server processes this step and returns the *next* form element, completely replacing the previous one (`hx-swap="outerHTML"`). The state is kept either in hidden fields (embedded sigils) or server-side sessions, culminating in the final creation of the complex entity when the final step is submitted.
