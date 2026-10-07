---
title: The Abstract Factory Sigil
description: Summoning families of related functional wards without specifying their concrete implementations.
type: fsharp
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: Conjuration // Sigilcraft
formula: |
  type Ward = { Power: int; Name: string }
  type Shield = { Capacity: int; Element: string }

  type IWardFactory =
      abstract member CreateWard: unit -> Ward
      abstract member CreateShield: unit -> Shield

  let arcaneFactory =
      { new IWardFactory with
          member _.CreateWard() = { Power = 100; Name = "Arcane Barrier" }
          member _.CreateShield() = { Capacity = 500; Element = "Arcane" } }

  let voidFactory =
      { new IWardFactory with
          member _.CreateWard() = { Power = 150; Name = "Void Ripple" }
          member _.CreateShield() = { Capacity = 300; Element = "Void" } }

  let manifestDefenses (factory: IWardFactory) =
      let ward = factory.CreateWard()
      let shield = factory.CreateShield()
      printfn "Manifested %s and %s shield." ward.Name shield.Element
tags: [creational, abstract-factory, fsharp, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Abstract Factory in the realm of F# is often distilled into records of functions or interfaces. Here, we bind functions into a cohesive interface representing a school of warding, ensuring that arcane defenses are perfectly attuned to their respective elemental domains.
