---
title: Singleton in Dhall
description: Ensure a single, unyielding source of truth across your configuration universe.
type: dhall
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // CoreTruth"
formula: |2
  let CoreTruth = { absoluteHalting : Bool, theOnePath : Text }
  
  let singleton : CoreTruth =
        { absoluteHalting = True, theOnePath = "Total Functional Programming" }
  
  in  singleton
tags: [dhall, halting, runes, configuration, creational]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

In a strictly evaluating environment, a **Singleton** is an unparameterized binding that is referenced globally. Any configuration artifact that imports this Dhall file accesses the exact same immutable essence, ensuring that the fundamental laws of your application's physics—such as Guaranteed Halting—remain undisputed.
