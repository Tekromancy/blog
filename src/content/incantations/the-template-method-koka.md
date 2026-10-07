---
title: The Template Ritual
description: Defines the skeleton of a magical ritual in an operation, deferring some steps to specific covens.
type: koka
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Evocation // Rituals"
formula: |2
  effect ritual-steps
    fun gather-components() : string
    fun chant() : string
  
  fun perform-ritual(action: () -> <ritual-steps|e> a) : <ritual-steps|e> a
    println("Starting ritual...")
    println(gather-components())
    println(chant())
    println("Ritual complete!")
    action()
  
  fun necromancy-ritual(action: () -> <ritual-steps|e> a) : e a
    with handler
      fun gather-components() "Gathering bone dust..."
      fun chant() "Rise from your graves!"
    action()
  
  pub fun main()
    with necromancy-ritual
    perform-ritual { () }
tags: [koka, template-method, effect-handlers]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
