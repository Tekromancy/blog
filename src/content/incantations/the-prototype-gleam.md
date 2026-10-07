---
title: The Prototype
description: Cloning magical essence without shared references.
type: gleam
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Conjuration // Replication"
formula: |2
  pub type Spellbook {
    Spellbook(spells: List(String), owner: String)
  }

  pub fn clone_and_reassign(book: Spellbook, new_owner: String) -> Spellbook {
    // Structural sharing and immutability make this a true prototype
    Spellbook(..book, owner: new_owner)
  }
tags: [conjuration, prototype, gleam]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Prototype
In an immutable world, all values are prototypes. Cloning is as simple as using record update syntax.
