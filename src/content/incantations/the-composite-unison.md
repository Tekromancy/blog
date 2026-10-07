---
title: The Composite
description: Compose magical artifacts into tree structures to represent part-whole hierarchies.
type: unison
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Conjuration // Constructs"
formula: |2
  structural type Construct = 
    Rune Text |
    Sigil [Construct]
    
  powerLevel : Construct -> Nat
  powerLevel c = match c with
    Rune t -> Text.size t
    Sigil cs -> List.foldLeft (acc sub -> acc + powerLevel sub) 0 cs
tags: [structural, composite, unison, recursion]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Composite pattern naturally maps to Unison's recursive algebraic data types. A `Construct` can be a single `Rune` (a leaf node) or a `Sigil` containing multiple sub-constructs. Operations upon the construct, like calculating its inherent power, are evaluated through simple, pure recursion, traversing the content-addressed tree flawlessly.
