---
title: The Template Method
description: Define the skeleton of an algorithm in an operation, deferring some steps to subclasses.
type: unison
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Abjuration // Ritual Frameworks"
formula: |2
  structural type RitualSteps = {
    prepare : () -> Text,
    execute : () -> Text,
    cleanup : () -> Text
  }
  
  performRitual : RitualSteps -> Text
  performRitual steps =
    p = RitualSteps.prepare steps ()
    e = RitualSteps.execute steps ()
    c = RitualSteps.cleanup steps ()
    p ++ " | " ++ e ++ " | " ++ c
    
  summonDemon : RitualSteps
  summonDemon = RitualSteps
    (_ -> "Draw pentagram")
    (_ -> "Speak true name")
    (_ -> "Banish sulfur")
tags: [behavioral, template-method, unison, records]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When the structure of a high-level ritual must remain rigid but the internal incantations must vary, the Template Method is employed. In Unison, we use a record containing the specific step functions. The master function, `performRitual`, dictates the exact ordering and orchestration of the execution, while the specific `RitualSteps` record passed in defines the localized arcane mechanics.
