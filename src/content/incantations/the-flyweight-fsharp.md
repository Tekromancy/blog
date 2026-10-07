---
title: The Flyweight Runestone
description: Sharing intrinsic magical properties across thousands of manifest runes to conserve aetherial memory.
type: fsharp
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: Conjuration // Efficiency
formula: |
  open System.Collections.Generic

  type RuneType = { Name: string; Color: string; AetherCost: int }

  type RuneFactory() =
      let cache = Dictionary<string, RuneType>()
      member _.GetRuneType(name, color, cost) =
          if not (cache.ContainsKey(name)) then
              cache.[name] <- { Name = name; Color = color; AetherCost = cost }
              printfn "Forged new rune type: %s" name
          cache.[name]

  type ManifestRune = { X: int; Y: int; Type: RuneType }

  let forge = RuneFactory()
  let fireRune = forge.GetRuneType("Fire", "Red", 10)
  
  let drawRune x y t = { X = x; Y = y; Type = t }

  let array1 = drawRune 10 20 fireRune
  let array2 = drawRune 15 25 (forge.GetRuneType("Fire", "Red", 10))

  printfn "Rune 1 and 2 share the same intrinsic essence: %b" (obj.ReferenceEquals(array1.Type, array2.Type))
tags: [structural, flyweight, fsharp, runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When an Archmage scribes a thousand fire runes, the immutable core (`RuneType`) is cached and shared. Only the extrinsic properties (coordinates) are unique to each instantiation.
