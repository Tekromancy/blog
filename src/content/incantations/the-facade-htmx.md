---
title: The Facade (Macro-Components)
description: Providing a unified, simplified interface to a complex subsystem of hypermedia elements.
type: htmx
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // Simplification"
formula: |2
  <!-- The Facade hides the complexity of multiple data fetches. -->
  <!-- A single directive summons the entire dashboard. -->
  <div hx-get="/api/dashboard/aggregate" hx-trigger="load">
    <div class="pulse-loader">Constructing Dashboard...</div>
  </div>

  <!-- The server response orchestrates the complex inner workings: -->
  <!-- 
    <div class="dashboard-grid">
      <div hx-get="/api/stats" hx-trigger="load"></div>
      <div hx-get="/api/alerts" hx-trigger="load"></div>
      <div hx-get="/api/activity" hx-trigger="load"></div>
    </div>
  -->
tags: [htmx, facade, orchestration, ui-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The **Facade** pattern provides a higher-level interface that makes a subsystem easier to use. In the hypermedia grimoire, a Facade is a macro-component. 

Rather than forcing the client to manually instantiate multiple distinct data widgets and coordinate their placement, the client issues a single command: `/api/dashboard/aggregate`. The server handles the complexity, returning a pre-orchestrated grid of sub-components. These sub-components may then autonomously fetch their own data. The client is shielded from the intricate web of dependencies, presented only with a clean, unified surface.
