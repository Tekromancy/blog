---
title: The Abstract Factory (Hypermedia Form)
description: A central hypermedia registry to conjure specific elemental forms through negotiated headers.
type: htmx
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Form-binding"
formula: |2
  <!-- The Abstract Factory is realized not through classes, but via content negotiation. -->
  <!-- The initiating rune requests a component, leaving the concrete shape to the server's discretion. -->
  <div class="summoning-circle">
    <button hx-get="/api/forge/component" 
            hx-headers='{"X-Arcane-Alignment": "shadow"}'
            hx-target="#manifestation-zone"
            hx-swap="innerHTML">
      Conjure UI Component
    </button>
  </div>
  
  <div id="manifestation-zone" class="ethereal-void">
    <!-- The factory endpoint determines if a button, card, or modal is summoned based on the arcane headers -->
  </div>
tags: [htmx, hypermedia, factory, conjuration, ui-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In the hypermedia paradigm, the **Abstract Factory** ceases to be a rigid hierarchy of classes. Instead, it becomes a nexus of dynamic form-binding. The client initiates a summoning request, offering its alignments and intentions via HTTP headers (`X-Arcane-Alignment`), but remains blissfully ignorant of the exact HTML sigils that will be returned.

The server acts as the grand artificer. It inspects the inbound request and selects the correct family of elements to return—be it a Shadow-forged data grid or a Neon-laced cyber-card. The HTMX `hx-get` directive ensures that the client simply opens a rift (`#manifestation-zone`) and accepts whatever the factory produces, binding it seamlessly into the DOM.
