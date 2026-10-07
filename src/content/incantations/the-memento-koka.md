---
title: The Memento Chronosphere
description: Captures and restores an object's internal state without violating encapsulation, rewinding time.
type: koka
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Transmutation // Chronomancy"
formula: |2
  struct chronosphere( state: int )
  
  effect time-magic
    ctl save-state(s: int) : chronosphere
    ctl restore-state(m: chronosphere) : int
  
  fun chronomancer(action: () -> <time-magic|e> a) : e a
    with handler
      ctl save-state(s) resume(chronosphere(s))
      ctl restore-state(m) resume(m.state)
    action()
  
  pub fun main()
    with chronomancer
    var hp := 100
    println("HP: " ++ hp.show)
    val snapshot = save-state(hp)
    hp = 10
    println("Took damage. HP: " ++ hp.show)
    hp = restore-state(snapshot)
    println("Time rewound. HP: " ++ hp.show)
tags: [koka, memento, chronomancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
