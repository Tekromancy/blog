---
title: The Iterator
description: Traversing arcane sequences lazily.
type: gleam
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Sequence Scrying"
formula: |2
  import gleam/iterator.{type Iterator}

  pub fn infinite_mana_well() -> Iterator(Int) {
    iterator.iterate(1, fn(n) { n + 1 })
  }

  pub fn draw_mana(well: Iterator(Int), amount: Int) -> List(Int) {
    well
    |> iterator.take(amount)
    |> iterator.to_list
  }
tags: [divination, iterator, gleam]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Iterator
Gleam provides built-in lazy iterators. We can draw from infinite wells of mana without exhausting our memory.
