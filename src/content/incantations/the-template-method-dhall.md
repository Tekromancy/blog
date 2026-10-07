---
title: Template Method in Dhall
description: Define the skeleton of a ritual while delegating specific steps.
type: dhall
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Evocation // Rituals"
formula: |2
  let RitualSteps =
        { prepare : Text
        , execute : Text
        , cleanup : Text
        }
  
  let performRitual = \(steps : RitualSteps) ->
        steps.prepare ++ " -> " ++ steps.execute ++ " -> " ++ steps.cleanup
  
  let haltingRitual : RitualSteps =
        { prepare = "Draw Circle"
        , execute = "Chant 'Halt'"
        , cleanup = "Erase Circle"
        }
  
  in  performRitual haltingRitual
tags: [dhall, halting, runes, configuration, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The **Template Method** provides a backbone for strict order-of-operations. In Dhall, one creates a master function that expects a record of customizable steps. The skeleton strictly dictates the flow of evaluation, while the injected properties ensure flexibility.
