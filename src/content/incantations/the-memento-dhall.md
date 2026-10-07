---
title: Memento in Dhall
description: Capture and store the immutable state of a runic matrix for later restoration.
type: dhall
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Abjuration // Preservation"
formula: |2
  let State = { runesActive : Natural, energy : Natural }
  
  let save = \(s : State) -> s
  let restore = \(m : State) -> m
  
  let initialState = { runesActive = 3, energy = 100 }
  let memento = save initialState
  
  let alteredState = initialState // { energy = 50 }
  
  in  restore memento
tags: [dhall, halting, runes, configuration, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Due to Dhall's immutability, the **Memento** pattern is almost trivial. Any captured state is fundamentally safe from mutation. By passing a record (Memento) as an argument, you can trivially roll back a complex configuration to a known-safe checkpoint without risking side-effects.
