---
title: The Proxy (Intersection Observer)
description: Delaying the instantiation of heavy hypermedia elements until they enter the visual viewport.
type: htmx
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Divination // Foresight"
formula: |2
  <!-- The Proxy acts as a placeholder, intercepting the render request until necessary. -->
  <div class="heavy-image-placeholder"
       hx-get="/api/render/high-res-artifact"
       hx-trigger="revealed"
       hx-swap="outerHTML">
    <span class="scrying-eye">Awaiting visibility...</span>
  </div>
tags: [htmx, proxy, lazy-load, revealed, performance]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The **Proxy** pattern provides a surrogate or placeholder for another object to control access to it. In the realm of HTMX, this is most elegantly demonstrated by the `revealed` trigger, which serves as a Virtual Proxy.

Instead of conjuring all heavy assets (like complex charts or high-resolution images) when the page loads, we leave a lightweight proxy in the DOM. This proxy waits dormantly. Through the divinatory power of the Intersection Observer (wrapped neatly in `hx-trigger="revealed"`), the proxy detects when it has entered the user's viewport. Only then does it execute the `hx-get` command, tearing away its placeholder shell and summoning the true, heavy artifact.
