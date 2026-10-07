---
title: The Flyweight in AWK
description: Share intrinsic memory states across millions of log lines to prevent memory exhaustion.
type: awk
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Memory-Weaving"
formula: |2
  # The cache of shared, immutable text fragments
  function get_heavy_glyph(char) {
      if (!(char in GLYPH_CACHE)) {
          # Simulating an expensive text generation or lookup
          GLYPH_CACHE[char] = "[[Ascended_Glyph_of_" char "]]"
          CACHE_MISSES++
      }
      return GLYPH_CACHE[char]
  }
  
  BEGIN { 
      CACHE_MISSES = 0
      
      # Simulating processing 10,000 text records
      for(i=0; i<10000; i++) {
          out = get_heavy_glyph("A")
      }
      
      print "Final String Output: " out
      print "Total Cache Misses: " CACHE_MISSES
  }
tags: [awk, text-processing, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When parsing gigabytes of server logs, memory usage in AWK can spike if identical strings are recreated. The Flyweight pattern mitigates this by caching common string manifestations in a global associative array, reusing the pointer rather than allocating fresh memory shards.
