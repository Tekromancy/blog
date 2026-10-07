---
title: The Wandering Sage (Visitor)
description: Representing an operation to be performed on the elements of an object structure.
type: sed
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Transmutation // Streamweaving"
formula: |2
  # Visitor: A separate "visitor" script line appends tags based on element types
  # Imagine a stream of tokens
  s/TYPE:A/& {Visited by A-Handler}/g
  s/TYPE:B/& {Visited by B-Handler}/g
  s/TYPE:C/& {Visited by C-Handler}/g
tags: [sed, behavioral, visitor]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
