---
title: The Sequential Sigils (Chain of Responsibility)
description: Passing a line through a chain of processing scripts until one handles it.
type: sed
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Transmutation // Streamweaving"
formula: |2
  # Chain of Responsibility: Test patterns, branch on success to avoid further processing
  /^DEBUG:/ {
    s/^DEBUG:/[Level: DEBUG]/
    b handled
  }
  /^WARN:/ {
    s/^WARN:/[Level: WARN]/
    b handled
  }
  /^ERROR:/ {
    s/^ERROR:/[Level: ERROR]/
    b handled
  }
  
  :handled
  # Exit or continue after being handled by the chain
  p
  d
tags: [sed, behavioral, chain-of-responsibility]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
