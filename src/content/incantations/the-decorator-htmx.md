---
title: The Decorator (Progressive Enhancement)
description: Dynamically attaching new behaviors to elements using HTMX extension inheritance.
type: htmx
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Enhancement"
formula: |2
  <!-- The base element, a simple form -->
  <form id="upload-form" hx-post="/api/upload">
    <input type="file" name="artifact" />
    <button type="submit">Upload</button>
  </form>

  <!-- Decorating the form dynamically by swapping its outer shell to add loading states and validation extensions -->
  <!-- Server response to an upgrade request: -->
  <form id="upload-form" 
        hx-post="/api/upload" 
        hx-ext="disable-element" 
        hx-disable-element="button[type='submit']">
    <input type="file" name="artifact" required />
    <button type="submit">Upload (Enhanced)</button>
    <div class="htmx-indicator">Transmitting arcane data...</div>
  </form>
tags: [htmx, decorator, progressive-enhancement, extensions]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The **Decorator** pattern attaches additional responsibilities to an object dynamically. In HTMX, we achieve this through **Progressive Enhancement**. A basic HTML element can be swapped out with a mathematically similar but functionally enhanced version of itself.

By swapping the `outerHTML` of a component, the server can inject `hx-ext` attributes, loading indicators, or validation rules into an existing form. The original element is decorated with new arcane powers (like automatically disabling buttons to prevent double-casting) without altering the fundamental structure of the DOM. It is a layering of magical wards upon an existing construct.
