---
title: The Iterator in AWK
description: Abstract the traversal of complex associative arrays and simulated lists.
type: awk
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Array-Walking"
formula: |2
  # Iterator initialization
  function iter_init(arr_name) { 
      _iter_idx[arr_name] = 1 
  }
  
  # Check for remaining elements
  function iter_has_next(arr, arr_name) { 
      return _iter_idx[arr_name] <= length(arr) 
  }
  
  # Retrieve and advance
  function iter_next(arr, arr_name,   val) { 
      val = arr[_iter_idx[arr_name]]
      _iter_idx[arr_name]++
      return val
  }
  
  BEGIN { 
      grimoire[1] = "Chapter 1: The Void"
      grimoire[2] = "Chapter 2: The Spark"
      grimoire[3] = "Chapter 3: The Flame"
      
      iter_init("grimoire")
      while(iter_has_next(grimoire, "grimoire")) {
          print "Reading... " iter_next(grimoire, "grimoire")
      }
  }
tags: [awk, text-processing, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

AWK natively iterates over associative arrays in a random hash order using `for (k in arr)`. To enforce deterministic, sequential traversal over ordered text collections, an Iterator abstraction manages internal indexing state, guaranteeing chronological processing.
