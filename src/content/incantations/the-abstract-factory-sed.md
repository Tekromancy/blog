---
title: The Abstract Factory of Streams
description: Orchestrating the creation of multiple related transmutation pipelines without binding to concrete script paths.
type: sed
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Transmutation // Streamweaving"
formula: |2
  # Abstract Factory: Branching based on environment/context lines
  # If we see a factory declaration, we switch processing modes.
  /^FACTORY:A/ {
    h
    s/.*/Running Factory A/
    p
    g
    d
  }
  /^FACTORY:B/ {
    h
    s/.*/Running Factory B/
    p
    g
    d
  }
tags: [sed, creational, factory]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
