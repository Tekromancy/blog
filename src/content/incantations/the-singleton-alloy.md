---
title: "The Singleton: The Solitary Node"
description: "Ensure a class only has one instance, and provide a global point of access."
type: alloy
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Singularity"
formula: |2
  one sig TheNexus {
    activeConnections: set Node
  }
  
  sig Node {}
  
  pred connect[n: Node] {
    n in TheNexus.activeConnections
  }
  
  run connect for 3
tags: [creational, singleton, oneness]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Singleton: The Solitary Node

The Singleton is arguably the most elegant pattern in Alloy. By prefixing a signature with the `one` multiplicity keyword, we command the Alloy Analyzer to generate exactly one atom of this sigil in every possible universe. `TheNexus` stands alone, unparalleled, an unbreakable singularity.
