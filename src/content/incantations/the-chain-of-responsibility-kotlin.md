---
title: The Chain of Responsibility Hex
description: Passing requests through a gauntlet of warding filters.
type: kotlin
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: Abjuration // Warding
formula: |
  data class MagicalRequest(val power: Int, var handled: Boolean = false)
  
  typealias SpellHandler = (MagicalRequest) -> MagicalRequest
  
  val apprenticeWard: SpellHandler = { req ->
      if (req.power < 10) req.copy(handled = true).also { println("Apprentice absorbed it.") }
      else req
  }
  
  val archmageWard: SpellHandler = { req ->
      if (!req.handled && req.power >= 10) req.copy(handled = true).also { println("Archmage deflected it.") }
      else req
  }
  
  val chain = listOf(apprenticeWard, archmageWard)
  fun process(req: MagicalRequest) = chain.fold(req) { r, handler -> handler(r) }
tags: [kotlin, behavioral, chain-of-responsibility]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Chain of Responsibility Hex

When a magical attack hits the system, it must be filtered through multiple layers of defense. The Chain of Responsibility routes the payload sequentially. In functional Kotlin, we can map handlers as pure functions and fold them over the request, creating an elegant, immutable chain of wards.
