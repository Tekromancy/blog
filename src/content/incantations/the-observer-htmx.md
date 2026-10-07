---
title: The Observer (Server-Sent Events)
description: Subscribing to an arcane stream of updates from the server, allowing multiple DOM nodes to react to external stimuli.
type: htmx
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Telepathy"
formula: |2
  <!-- Connect to a Server-Sent Events (SSE) stream -->
  <div hx-ext="sse" sse-connect="/api/stream/battle-events">
    
    <!-- Observer 1: Listens for "damage" events -->
    <div sse-swap="damage" hx-target="#health-bar" hx-swap="outerHTML">
      <!-- Implicitly swaps incoming HTML into the target -->
    </div>

    <!-- Observer 2: Listens for "loot" events -->
    <ul id="loot-log" sse-swap="loot" hx-swap="afterbegin">
      <li>Awaiting loot drops...</li>
    </ul>

  </div>

  <div id="health-bar" class="status-indicator">HP: 100/100</div>
tags: [htmx, observer, sse, real-time, pub-sub]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The **Observer** pattern defines a one-to-many dependency, so that when one object changes state, all its dependents are notified. In modern hypermedia, this is achieved flawlessly through **Server-Sent Events (SSE)** or WebSockets, facilitated by HTMX extensions.

The client opens a telepathic link to the server (`sse-connect`). The server acts as the subject, broadcasting events into the aether. Various DOM nodes act as Observers, specifically tuning their receivers (`sse-swap`) to distinct event channels like `damage` or `loot`. When the server publishes a message on a channel, the corresponding Observers automatically intercept the incoming HTML payload and weave it into the DOM, creating highly reactive, real-time interfaces without manual polling.
