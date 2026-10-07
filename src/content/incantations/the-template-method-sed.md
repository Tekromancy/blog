---
title: The Arcane Skeleton (Template Method)
description: Defining the skeleton of an algorithm in an operation, deferring some steps to subclasses (or later scripts).
type: sed
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Transmutation // Streamweaving"
formula: |2
  # Template Method: Execute a fixed sequence of steps
  /PROCESS/ {
    # Step 1: Pre-process (Template skeleton)
    s/.*/[PRE] &/
    
    # Step 2: Hook for custom processing (Subclass responsibility)
    # E.g. relying on a specific marker that other sed commands can target later
    s/$/ [HOOK:CUSTOM]/
    
    # Step 3: Post-process (Template skeleton)
    s/$/ [POST]/
  }
tags: [sed, behavioral, template-method]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
