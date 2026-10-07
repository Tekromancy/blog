---
title: The Iterator Hex
description: Traversing chaotic collections of magical artifacts safely.
type: kotlin
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: Divination // Seeking
formula: |
  class Grimoire(private val spells: List<String>) : Iterable<String> {
      override fun iterator(): Iterator<String> = GrimoireIterator(spells)
  }
  
  class GrimoireIterator(private val spells: List<String>) : Iterator<String> {
      private var index = 0
      override fun hasNext() = index < spells.size
      override fun next(): String {
          if (!hasNext()) throw NoSuchElementException("No more spells")
          return spells[index++]
      }
  }
tags: [kotlin, behavioral, iterator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Iterator Hex

To scan a collection of volatile artifacts without triggering a cataclysm requires precision. The Iterator Hex separates the traversal mechanism from the data structure itself. In modern Kotlin, this pattern is deeply integrated into the language via `Iterable` and `Sequence`, hiding the complexity behind elegant `for` loops.
