---
title: Iterator
description: Traverse complex extra-dimensional labyrinths sequentially without exposing their non-euclidean geometry.
type: d
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Leyline Tracing"
formula: |2
  interface PortalIterator {
      bool hasNext();
      string nextPortal();
  }

  class LabyrinthIterator : PortalIterator {
      private string[] portals;
      private int index = 0;
      this(string[] p) { portals = p; }
      override bool hasNext() { return index < portals.length; }
      override string nextPortal() { return portals[index++]; }
  }
tags: [behavioral, iterator, dlang, traversal]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Systematically explore arcane nodes without breaking abstraction.
