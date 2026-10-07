---
title: The Shared Buffer (Flyweight)
description: Minimizing memory usage by sharing common data strings via the hold space.
type: sed
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Streamweaving"
formula: |2
  # Flyweight: Define a heavy string once
  1 {
    x
    s/^$/<<<SUPER_HEAVY_COMMON_STRING_USED_EVERYWHERE>>>/
    x
  }
  # Inject it when needed
  /INJECT_FLYWEIGHT/ {
    G
    s/\n/ /
  }
tags: [sed, structural, flyweight]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
