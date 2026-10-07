---
title: Observer
description: Respond to state changes automatically, such as using ResizeObserver equivalents like Container Queries.
type: css
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Reactive Scrying"
formula: |2
  /* The container acts as the subject */
  .ward-container {
    container-type: inline-size;
    container-name: magical-ward;
  }
  
  /* Children observe the container and react organically */
  @container magical-ward (min-width: 500px) {
    .ward-child {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      background: rgba(0, 255, 100, 0.1);
    }
  }
tags: [css, container-queries, responsiveness, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

Container Queries serve as pure CSS Observers. Elements quietly watch their parent's dimensions and recalculate their internal behaviors instantly when specific spatial thresholds are crossed.
