---
title: The Iterator Ward
description: Traversing arcane sequences.
type: pony
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  class ScrollIterator
    let _scrolls: Array[Scroll val] val
    var _index: USize = 0
    new create(s: Array[Scroll val] val) => _scrolls = s
    fun has_next(): Bool => _index < _scrolls.size()
    fun ref next(): Scroll val ? => _scrolls(_index = _index + 1)?
tags: [pony, iterator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

## The Iterator Ward

Standard iterator patterns fit into Pony's iterators, extracting sequences of `val` or `ref` data across magical collections.
