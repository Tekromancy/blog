---
title: The Template Method Hex
description: Defining the skeleton of a ritual while deferring the specifics.
type: kotlin
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: Evocation // Ritual
formula: |
  abstract class Ritual {
      fun performRitual() {
          prepareAltar()
          chant()
          ignite()
      }
      
      private fun prepareAltar() = println("Cleaning altar.")
      abstract fun chant()
      private fun ignite() = println("Lighting candles.")
  }
  
  class FireRitual : Ritual() {
      override fun chant() = println("Chanting words of flame.")
  }
tags: [kotlin, behavioral, template-method]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Template Method Hex

Rituals demand a precise sequence of events. The Template Method Hex defines the skeletal structure of an algorithm in a base class, sealing the order of operations, while allowing subclasses to override specific magical steps. It enforces architectural discipline while permitting localized creativity.
