---
title: The Cloning Lexicon (Prototype)
description: Cloning an existing stream artifact from the hold space instead of redefining it.
type: sed
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Transmutation // Streamweaving"
formula: |2
  # Prototype: Store the prototype in the hold space, clone it on demand
  /PROTOTYPE:/ {
    s/PROTOTYPE://
    h
    d
  }
  /CLONE/ {
    g
    p
    d
  }
tags: [sed, creational, prototype]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
