---
title: The Fractal Match (Composite)
description: Treating individual lines and blocks of lines uniformly.
type: sed
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Transmutation // Streamweaving"
formula: |2
  # Composite: Handling nested structures via multi-line patterns (N, P, D)
  /<group>/ {
    :loop
    N
    /<\/group>/! b loop
    # Now we have a composite group in the pattern space
    s/<group>\(.*\)<\/group>/\1/g
  }
tags: [sed, structural, composite]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
