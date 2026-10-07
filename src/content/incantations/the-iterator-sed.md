---
title: The Line Walker (Iterator)
description: Sequentially accessing lines in an aggregated buffer without exposing its internal representation.
type: sed
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Transmutation // Streamweaving"
formula: |2
  # Iterator: Process a multi-line buffer line by line
  # Let's say we read the entire file into hold space
  H
  $ {
    g
    :loop
    # Extract first line of the buffer
    s/^\([^\n]*\)\n\(.*\)/\1/
    p
    # Restore the rest of the buffer
    g
    s/^\([^\n]*\)\n\(.*\)/\2/
    h
    # Repeat until buffer is empty
    /[^\n]/ b loop
  }
  d
tags: [sed, behavioral, iterator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
