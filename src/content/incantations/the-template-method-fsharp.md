---
title: The Template Method Ritual
description: Defining the skeleton of a ritual in an operation, deferring specific chanting to subclasses.
type: fsharp
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: Conjuration // Rituals
formula: |
  [<AbstractClass>]
  type BaseRitual() =
      abstract member PrepareComponents: unit -> unit
      abstract member Chant: unit -> unit
      abstract member Ignite: unit -> unit
      
      // The Template Method
      member this.PerformRitual() =
          this.PrepareComponents()
          this.Chant()
          this.Ignite()
          printfn "The ritual concludes in a burst of magic."

  type FireDemonRitual() =
      inherit BaseRitual()
      override _.PrepareComponents() = printfn "Gathering sulfur and ash."
      override _.Chant() = printfn "Chanting in ignan: 'Ignis ire!'"
      override _.Ignite() = printfn "Lighting the brimstone circle."

  let summoning = FireDemonRitual()
  summoning.PerformRitual()
tags: [behavioral, template-method, fsharp, rituals]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Template Method acts as a master grimoire's index. It prescribes the inescapable order of the ritual (Prepare, Chant, Ignite), while the specialized cults fill in the specific words of power.
