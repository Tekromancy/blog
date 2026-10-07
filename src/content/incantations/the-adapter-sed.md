---
title: The Compatibility Glyph (Adapter)
description: Translating one stream format into another expected by subsequent pipes.
type: sed
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Streamweaving"
formula: |2
  # Adapter: Convert CSV-like input to JSON-like output
  /^\([^,]*\),\([^,]*\)/ {
    s/^\([^,]*\),\([^,]*\)/{"key": "\1", "value": "\2"}/
  }
tags: [sed, structural, adapter]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
