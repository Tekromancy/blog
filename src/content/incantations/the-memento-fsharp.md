---
title: The Memento Time-Anchor
description: Capturing and restoring the internal state of a spellcasting matrix without violating encapsulation.
type: fsharp
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: Transmutation // Chronomancy
formula: |
  type Memento = { State: string }

  type Chronomancer() =
      let mutable currentState = "Calm"

      member _.SetState(state) = 
          currentState <- state
          printfn "Chronomancer state is now: %s" currentState
          
      member _.SaveTimeAnchor() = { State = currentState }
      
      member _.RestoreTimeAnchor(memento: Memento) =
          currentState <- memento.State
          printfn "Time rewound. State restored to: %s" currentState

  type ChronoVault() =
      let mutable savedAnchor : Memento option = None
      member _.Store(m) = savedAnchor <- Some m
      member _.Retrieve() = savedAnchor.Value

  let magus = Chronomancer()
  let vault = ChronoVault()

  magus.SetState("Channeling Arcane Power")
  vault.Store(magus.SaveTimeAnchor())

  magus.SetState("Exhausted")
  
  magus.RestoreTimeAnchor(vault.Retrieve())
tags: [behavioral, memento, fsharp, chronomancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Chronomancy requires precision. By storing the `Memento`—a crystalline snapshot of the timeline—the Archmage can freely experiment with chaotic energies, safe in the knowledge that reality can be rewound to the anchor point.
