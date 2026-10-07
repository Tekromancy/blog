---
title: The Prototype Clone Hex
description: Replicates arcane artifacts exactly using pure functions and immutable structs.
type: koka
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Duplication"
formula: |2
  struct grimoire( title: string, spells: list<string>, mana-cost: int )
  
  fun clone-and-modify(g: grimoire, new-title: string) : grimoire
    g(title = new-title)
  
  pub fun main()
    val original = grimoire("Book of Shadows", ["invisibility", "fear"], 50)
    val copy = clone-and-modify(original, "Book of Deeper Shadows")
    println(copy.title)
tags: [koka, prototype, immutable]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
