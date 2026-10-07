---
title: The Solitary Buffer (Singleton)
description: Ensuring only one instance of a sacred text exists across the entire stream processing.
type: sed
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Transmutation // Streamweaving"
formula: |2
  # Singleton: Initialize only if hold space is empty
  1 {
    # On first line, populate the singleton in hold space
    x
    s/^$/[SINGLETON INSTANCE]/
    x
  }
  /GET_SINGLETON/ {
    x
    p
    x
    d
  }
tags: [sed, creational, singleton]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
