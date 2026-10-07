---
title: The Singleton Monolith
description: A singular, immutable locus of magical energy within the CLR.
type: fsharp
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Leylines"
formula: |2
  type LeylineNexus private () =
      static let instance = LeylineNexus()

      let mutable energyLevel = 1000

      static member Instance = instance

      member _.TapEnergy(amount) =
          if energyLevel >= amount then
              energyLevel <- energyLevel - amount
              printfn "Tapped %d energy. Remaining: %d" amount energyLevel
          else
              printfn "Nexus depleted!"

  // Usage:
  let nexus = LeylineNexus.Instance
  nexus.TapEnergy(50)
tags: [creational, singleton, fsharp, leylines]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

F# modules provide a natural singleton. However, when object-oriented state must be strictly bounded to a single CLR instance, a static instance wrapped in a private constructor secures the nexus against multiple instantiations.
