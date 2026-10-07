---
title: The Chain of Wards
description: Passes an arcane anomaly along a chain of wards until one can dispel it.
type: koka
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Dispelling"
formula: |2
  effect handle-anomaly
    ctl dispel(severity: int) : bool
  
  fun fire-ward(action: () -> <handle-anomaly|e> a) : <handle-anomaly|e> a
    with handler
      ctl dispel(sev)
        if sev <= 5 then resume(True)
        else resume(dispel(sev))
    action()
  
  fun void-ward(action: () -> <handle-anomaly|e> a) : <handle-anomaly|e> a
    with handler
      ctl dispel(sev)
        if sev <= 10 then resume(True)
        else resume(dispel(sev))
    action()
  
  pub fun main()
    with handler
      ctl dispel(_) resume(False) // Ultimate failure
    with void-ward
    with fire-ward
    
    if dispel(3) then println("Dispelled level 3") else println("Failed")
    if dispel(8) then println("Dispelled level 8") else println("Failed")
    if dispel(15) then println("Dispelled level 15") else println("Failed")
tags: [koka, chain-of-responsibility, effect-chaining]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
