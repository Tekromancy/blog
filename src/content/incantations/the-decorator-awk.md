---
title: The Decorator in AWK
description: Layer text transformations chronologically to augment the output string.
type: awk
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Layering"
formula: |2
  # The base text entity
  function base_text() { return "System failure detected" }
  
  # Decorator 1: Timestamp
  function decor_timestamp(text) { 
      # In modern awk, systime() can be used
      return "[2026-10-07 00:00:00] " text 
  }
  
  # Decorator 2: Severity
  function decor_severity(text, level) { 
      return text " (Severity: " level ")" 
  }
  
  # Decorator 3: Colorization (ANSI Escape)
  function decor_color_red(text) { 
      return "\033[31m" text "\033[0m" 
  }
  
  BEGIN { 
      # Wrapping the entity in multiple layers of enchantment
      final_msg = decor_color_red(decor_severity(decor_timestamp(base_text()), "CRITICAL"))
      print final_msg
  }
tags: [awk, text-processing, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Functional composition acts as the Decorator in AWK. By passing the result of one function into another, we wrap the original string in layers of metadata, ANSI formatting, and contextual sigils without permanently modifying the core generation logic.
