---
title: The Prototype (Template Cloning)
description: Cloning existing DOM fragments to rapidly spawn entities without server roundtrips.
type: htmx
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Duplication"
formula: |2
  <!-- The prototype template lies dormant, invisible to the naked eye. -->
  <template id="minion-prototype">
    <div class="minion-entity" hx-post="/api/minion/activate" hx-trigger="click">
      <span class="status">Dormant Minion</span>
    </div>
  </template>

  <!-- Hyperscript is often paired with HTMX for rapid client-side cloning -->
  <button _="on click 
               put innerHTML of #minion-prototype 
               at end of #minion-army">
    Clone Minion
  </button>

  <div id="minion-army" class="swarm-container">
    <!-- Cloned entities manifest here -->
  </div>
tags: [htmx, hyperscript, prototype, cloning, templating]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

While HTMX primarily deals with server-driven state, the **Prototype** pattern frequently manifests on the client side when sheer speed is required. By utilizing the HTML `<template>` element as an arcane blueprint, we can stamp out copies of a DOM node instantly.

When paired with a tool like hyperscript (or standard JavaScript), the client can duplicate the dormant shell. These shells are pre-inscribed with HTMX attributes (`hx-post`), meaning that once they are cloned into the active DOM, they are fully capable of phoning home to the server to truly awaken. It is a perfect marriage of client-side illusion and server-side substance.
