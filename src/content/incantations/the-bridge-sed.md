---
title: The Abstraction Span (Bridge)
description: Decoupling an abstraction from its implementation by routing through distinct address spaces.
type: sed
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Streamweaving"
formula: |2
  # Bridge: Decoupling the operation (e.g., upper/lower) from the data source
  /OP:UPPER/ {
    h
    s/.*/y\/abcdefghijklmnopqrstuvwxyz\/ABCDEFGHIJKLMNOPQRSTUVWXYZ\//
    # In sed, a true bridge is hard; we approximate by shaping a script
  }
  # A true sed bridge might involve writing to a temporary script file and executing it
  /EXEC/ {
    x
    w /tmp/bridge.sed
    x
    # execute would require GNU sed 'e' or similar
  }
tags: [sed, structural, bridge]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
