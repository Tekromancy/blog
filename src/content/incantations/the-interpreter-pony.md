---
title: The Interpreter Ward
description: Parsing ancient runes.
type: pony
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Rune Decoding"
formula: |2
  trait val Expression
    fun evaluate(context: Context ref): Bool

  class val RuneMatch is Expression
    let _rune: String
    new create(r: String) => _rune = r
    fun evaluate(context: Context ref): Bool => context.has(_rune)
tags: [pony, interpreter]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

## The Interpreter Ward

Grammars map nicely to immutable `val` classes, interpreting runes efficiently and safely within a local execution context.
