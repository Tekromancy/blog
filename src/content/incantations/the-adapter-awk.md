---
title: The Adapter in AWK
description: Mutate legacy fixed-width text streams into modern JSON sigils.
type: awk
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Format-Shifting"
formula: |2
  # Adapting CSV/TSV positional fields to a JSON output structure
  function adapt_row_to_json(f1, f2, f3) {
      return sprintf("{\"id\": \"%s\", \"spell\": \"%s\", \"cost\": \"%s\"}", f1, f2, f3)
  }
  
  BEGIN { 
      FS="," 
      print "["
  }
  
  # Each record is intercepted and adapted
  NR > 1 {
      print adapt_row_to_json($1, $2, $3) ","
  }
  
  END {
      print "]"
  }
tags: [awk, text-processing, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The core identity of AWK is an Adapter. It continuously intercepts streams of unstructured or semi-structured data and maps them into another interface format. Here, we encapsulate the adaptation logic into a precise transmutation function.
