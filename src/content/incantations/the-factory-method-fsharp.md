---
title: The Factory Method Ritual
description: Deferring the instantiation of familiars to specialized sub-rituals.
type: fsharp
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Summoning"
formula: |2
  type IFamiliar =
      abstract member Manifest: unit -> string

  type Wisp() =
      interface IFamiliar with
          member _.Manifest() = "A glowing wisp illuminates the shadows."

  type Imp() =
      interface IFamiliar with
          member _.Manifest() = "A mischievous imp materializes in a puff of brimstone."

  type FamiliarSummoner =
      abstract member Summon: unit -> IFamiliar
      member this.PerformRitual() =
          let familiar = this.Summon()
          printfn "Ritual complete: %s" (familiar.Manifest())

  type CelestialSummoner() =
      inherit FamiliarSummoner()
      override _.Summon() = Wisp() :> IFamiliar

  type InfernalSummoner() =
      inherit FamiliarSummoner()
      override _.Summon() = Imp() :> IFamiliar
tags: [creational, factory-method, fsharp, familiars]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Factory Method allows an archmage to define the skeleton of a ritual while allowing specialized covens to dictate the exact nature of the entity being drawn from the ether.
