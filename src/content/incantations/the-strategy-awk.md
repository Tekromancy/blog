---
title: The Strategy in AWK
description: Hot-swap sorting and evaluation algorithms based on dynamic runtime configurations.
type: awk
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Algorithm-Swapping"
formula: |2
  # Strategy 1: Numeric Comparison
  function strat_numeric(a, b) {
      return a - b
  }
  
  # Strategy 2: Lexical Comparison
  function strat_lexical(a, b) {
      if (a "" < b "") return -1
      if (a "" > b "") return 1
      return 0
  }
  
  # The Context Executing the Strategy
  function compare_elements(strategy, a, b) {
      if (strategy == "NUMERIC") return strat_numeric(a, b)
      if (strategy == "LEXICAL") return strat_lexical(a, b)
  }
  
  BEGIN { 
      val1 = "10"; val2 = "2"
      
      # Lexical: "10" is less than "2"
      print "Lexical Result: " compare_elements("LEXICAL", val1, val2)
      
      # Numeric: 10 is greater than 2
      print "Numeric Result: " compare_elements("NUMERIC", val1, val2)
  }
tags: [awk, text-processing, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Strategy pattern provides the flexibility to alter behavior at runtime. When sorting or filtering records, instead of hardcoding the comparison type, the algorithm delegates to an interchangeable strategy function selected by the Archmage's arguments.
