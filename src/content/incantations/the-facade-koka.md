---
title: The Facade Grimoire
description: Provides a simplified interface to a complex system of interconnected mystical subsystems.
type: koka
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Divination // Clarity"
formula: |2
  effect leylines { fun tap() : int }
  effect astromancy { fun read-stars() : string }
  
  fun cosmos-facade(action: () -> <leylines,astromancy|e> a) : e a
    with handler
      fun tap() 500
    with handler
      fun read-stars() "The stars align"
    action()
  
  effect grand-ritual
    fun perform() : string
  
  fun ritual-facade(action: () -> <grand-ritual|e> a) : e a
    with cosmos-facade
    with fun perform() read-stars() ++ " and power flows: " ++ tap().show
    action()
  
  pub fun main()
    with ritual-facade
    println(perform())
tags: [koka, facade, structural]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
