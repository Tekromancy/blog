---
title: The Echoes of the Past (Memento)
description: Capturing and externalizing an object's internal state so it can be restored later.
type: sed
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Transmutation // Streamweaving"
formula: |2
  # Memento: Save the pattern space to the hold space, mutate it, and revert
  /START/ {
    # Save state
    h
    # Perform destructive operations
    s/.*/MUTATED STATE/
    p
    # Restore state
    g
  }
tags: [sed, behavioral, memento]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
