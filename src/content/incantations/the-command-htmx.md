---
title: The Command (Encapsulated Requests)
description: Encapsulating all information needed to perform an action within a self-contained HTMX attribute set.
type: htmx
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Evocation // Invocation"
formula: |2
  <!-- Each button acts as a fully encapsulated command object. -->
  <!-- It knows the endpoint, the method, the data, and the target. -->
  <div class="control-panel">
    <button hx-post="/api/system/reboot" 
            hx-vals='{"force": true}'
            hx-confirm="Initiate forced sequence?"
            hx-target="#system-log">
      Force Reboot
    </button>
    
    <button hx-delete="/api/system/cache"
            hx-target="#system-log"
            hx-swap="beforeend">
      Purge Cache
    </button>
  </div>
tags: [htmx, command, encapsulation, declarative]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The **Command** pattern encapsulates a request as an object, thereby allowing for parameterization of clients. In HTMX, the HTML element itself *is* the Command Object. 

Through declarative attributes, we encapsulate the method (`hx-post`), the receiver/URI (`/api/system/reboot`), the parameters (`hx-vals`), and the UI update instructions (`hx-target`). There is no separate JavaScript function needed to wire these together. The button stands as an independent, fully self-sufficient rune of execution, capable of being moved anywhere in the DOM without losing its inherent power.
