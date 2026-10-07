---
title: The Strategy Hex
description: Defining a family of interchangeable algorithms and behaviors via Closures.
type: groovy
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Enchantment // Polymorphism"
formula: |2
  class Encryptor {
      Closure strategy

      String encrypt(String text) {
          strategy(text)
      }
  }

  def rot13 = { String t -> 
      t.collect { (it as char) + 13 as char }.join() 
  }

  def reverse = { String t -> t.reverse() }

  def cipher = new Encryptor(strategy: reverse)
  println cipher.encrypt("SECRET_PAYLOAD")

  cipher.strategy = rot13
  println cipher.encrypt("SECRET_PAYLOAD")
tags: [groovy, behavioral, strategy, closures]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Strategy Hex

In the Java dimensional plane, Strategy requires an interface and numerous implementation classes. In Groovy, Strategy is merely a Closure injected at runtime. Algorithms, data processors, and attack vectors can be passed around like data, allowing the core Encryptor class to mutate its core behavior depending on the cyber-mage's immediate tactical needs.
