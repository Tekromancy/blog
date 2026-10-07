---
title: The Visitor Incantation
description: Executing external logic upon internal color blocks without altering them in Piet.
type: piet
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Chromatic Sorcery"
formula: |2
  // Piet visitor representation:
  // - Object Structure: A rigid data matrix on the canvas.
  // - Visitor: A traversing pointer loop acting as an external entity.
  // - Accept: The data matrix passing its current state via duplicate and push.
  // - Visit: The visitor block analyzing the pushed state and modifying an external accumulator.
tags: [behavioral, visitor, piet]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

The Visitor is a ghost traversing the corporeal matrix. It drifts across established data structures, reading their essence and updating its own external accumulator without ever needing to rewrite the ancient color blocks it studies.
