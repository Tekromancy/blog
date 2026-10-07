---
title: The Wrapper Runes (Decorator)
description: Dynamically adding behavior or markers to a stream without altering the original script logic.
type: sed
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Streamweaving"
formula: |2
  # Decorator: Wrap lines with new formatting
  s/.*/[DECORATOR1] & [\/DECORATOR1]/
  /urgent/ {
    s/.*/!!! & !!!/
  }
tags: [sed, structural, decorator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
