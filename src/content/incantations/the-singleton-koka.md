---
title: The Singleton Monolith
description: Ensuring only one instance of the Archmage's state exists within the current execution hex.
type: koka
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Sealing"
formula: |2
  effect state<a,e>
    fun get() : a
    ctl set(v : a) : ()
  
  fun with-singleton(init: a, action: () -> <state<a,e>|e> b) : e b
    var current := init
    with handler
      fun get() current
      ctl set(v) { current = v; resume(()) }
    action()
  
  pub fun main()
    with with-singleton(42)
    val mana = get()
    println("Mana pool: " ++ mana.show)
    set(mana - 10)
    println("Remaining: " ++ get().show)
tags: [koka, singleton, state-effect]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
