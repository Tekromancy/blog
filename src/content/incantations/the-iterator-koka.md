---
title: The Iterator Leyline
description: Traverses a collection of enchanted items sequentially without exposing the underlying representation.
type: koka
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  effect emit<a>
    ctl yield(val: a) : ()
  
  fun iterate-leyline(items: list<string>) : <emit<string>> ()
    items.foreach(yield)
  
  pub fun main()
    val inventory = ["Health Potion", "Mana Potion", "Phoenix Down"]
    with handler
      ctl yield(v) { println("Scried: " ++ v); resume(()) }
    iterate-leyline(inventory)
tags: [koka, iterator, generator-effect]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
