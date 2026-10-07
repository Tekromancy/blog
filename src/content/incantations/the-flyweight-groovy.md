---
title: The Flyweight Hex
description: Using sharing to support large numbers of fine-grained objects efficiently.
type: groovy
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Optimization"
formula: |2
  class Rune {
      final String symbol
      Rune(String s) { 
          this.symbol = s
          println "Forging new rune: $s"
      }
      void glow(String color) { println "Rune $symbol glowing $color" }
  }

  class RuneFactory {
      private static Map<String, Rune> cache = [:]

      static Rune getRune(String s) {
          cache.computeIfAbsent(s) { new Rune(it) }
      }
  }

  def r1 = RuneFactory.getRune("ALPHA")
  def r2 = RuneFactory.getRune("ALPHA")

  r1.glow("Red")
  r2.glow("Blue")

  assert r1.is(r2) // They are the exact same instance in memory
tags: [groovy, structural, flyweight, memoization]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Flyweight Hex

Memory limits are real, even in the infinite grid of the JVM. When a system requires millions of identical runic instances, the Flyweight hex intercepts the instantiation process and serves a shared, immutable reference from a centralized cache. Groovy's `computeIfAbsent` map method makes this pattern trivial to implement, drastically reducing heap consumption.
