---
title: The Template Method Pattern
description: Defining the skeleton of an arcane ritual, allowing subclasses to override specific steps.
type: swift
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: Enchantment // Rituals
formula: |
  protocol Ritual {
      func prepareIngredients()
      func chant()
      func execute()
  }
  extension Ritual {
      func performRitual() {
          prepareIngredients()
          chant()
          execute()
      }
  }
  class SummonFamiliar: Ritual {
      func prepareIngredients() { print("Gathering herbs") }
      func chant() { print("Chanting summoning words") }
      func execute() { print("Familiar appears!") }
  }
tags: [swift, design-pattern, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Template Method: The Standard Ritual

The `Ritual` protocol uses an extension to define the `performRitual` Template Method. Concrete rituals like `SummonFamiliar` only need to provide the specific steps.
