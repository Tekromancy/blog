---
title: The Composite Coven
description: Treating individual magi and entire covens uniformly.
type: fsharp
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Enchantment // Unity"
formula: |2
  type IMagicEntity =
      abstract member CastPower: unit -> int

  type Magus(power: int) =
      interface IMagicEntity with
          member _.CastPower() = power

  type Coven() =
      let mutable members : IMagicEntity list = []

      member _.Add(entity: IMagicEntity) =
          members <- entity :: members

      interface IMagicEntity with
          member _.CastPower() =
              members |> List.sumBy (fun m -> m.CastPower())

  let adept1 = Magus(10)
  let adept2 = Magus(15)

  let innerCircle = Coven()
  innerCircle.Add(adept1)
  innerCircle.Add(adept2)

  let grandCoven = Coven()
  grandCoven.Add(innerCircle)
  grandCoven.Add(Magus(50))

  printfn "Total Power: %d" ((grandCoven :> IMagicEntity).CastPower())
tags: [structural, composite, fsharp, covens]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

By representing magi and the covens they form with the same `IMagicEntity` sigil, recursive hierarchies of magical power can be evaluated seamlessly.
