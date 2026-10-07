---
title: The Observer Familiar
description: A one-to-many dependency where familiars are notified automatically of their master's state changes.
type: koka
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Clairvoyance"
formula: |2
  effect observable
    ctl notify(event: string) : ()
  
  fun with-familiars(action: () -> <observable|e> a) : e a
    with handler
      ctl notify(ev)
        println("Raven saw: " ++ ev)
        println("Cat felt: " ++ ev)
        resume(())
    action()
  
  pub fun main()
    with with-familiars
    notify("Master cast a spell")
    notify("Master is sleeping")
tags: [koka, observer, pub-sub]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
