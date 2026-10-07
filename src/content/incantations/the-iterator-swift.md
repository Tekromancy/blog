---
title: The Iterator Pattern
description: Traversing a collection of magical artifacts securely.
type: swift
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  struct Spellbook: Sequence {
      let spells: [String]
      func makeIterator() -> IndexingIterator<[String]> {
          return spells.makeIterator()
      }
  }
tags: [swift, design-pattern, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Iterator: Scrying the Spellbook

Swift's `Sequence` and `IteratorProtocol` provide native tools for safely traversing the ancient texts of a `Spellbook`.
