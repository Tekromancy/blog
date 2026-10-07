---
title: "The Memento: Spatial Snapshot"
description: "Capture and restore the internal state of a 3D ward."
type: trefunge
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Divination // Chronomancy"
formula: |2
  > "Save" v
  v g g p p <
  > "Load" v
  @ g g p p <
tags: [memento, trefunge, topology, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

A tekromancer must occasionally rewind the grid to a prior state of equilibrium. The Memento is the Spatial Snapshot.

By iterating through the active ward and using `g` to read its state, we then `p` (put) those values into a dense, inert storage layer of the Three-Dimensional Topology Ward. If a restorative spell is invoked, the vectors reverse, safely loading the captured matrix back into active execution.
