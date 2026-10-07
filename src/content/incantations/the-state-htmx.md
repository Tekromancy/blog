---
title: The State (Morphing UI)
description: Allowing an element to alter its behavior and structure dynamically as its internal state changes.
type: htmx
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Polymorphism"
formula: |2
  <!-- Initial State: Read Mode -->
  <div id="profile-card" class="state-read">
    <h2>Mage Name: Gandalf</h2>
    <button hx-get="/api/profile/edit" hx-target="#profile-card" hx-swap="outerHTML">
      Edit Profile
    </button>
  </div>

  <!-- Server Response transitions UI to Edit Mode: -->
  <!-- 
  <form id="profile-card" class="state-edit" hx-put="/api/profile/save" hx-swap="outerHTML">
    <input type="text" name="name" value="Gandalf" />
    <button type="submit">Save Changes</button>
    <button hx-get="/api/profile/view" hx-target="#profile-card" hx-swap="outerHTML">Cancel</button>
  </form> 
  -->
tags: [htmx, state-pattern, inline-edit, ui-morphing]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The **State** pattern allows an object to alter its behavior when its internal state changes, appearing as though the object has changed its class. In HTMX, this is the classic **Inline Edit** pattern.

A DOM element requests a transmutation from the server. The server responds not just with data, but with a completely new structural representation of the element. A static reading card morphs into an interactive HTML form. The element's behavior changes entirely—it now responds to `hx-put` instead of `hx-get`. By constantly swapping `outerHTML`, the component seamlessly cycles through various states (read, edit, loading, error) managed entirely by the server's logic.
