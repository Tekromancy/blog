---
title: The Iterator Scrying Pool
description: Sequentially uncovering the secrets hidden within an arcane collection without exposing its underlying matrix.
type: fsharp
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  open System.Collections.Generic

  type Artifact = { Name: string }

  type Vault() =
      let items = List<Artifact>()
      member _.Add(item) = items.Add(item)
      member _.Count = items.Count
      member _.Get(index) = items.[index]

  type VaultIterator(vault: Vault) =
      let mutable current = 0
      member _.HasNext() = current < vault.Count
      member _.Next() =
          let item = vault.Get(current)
          current <- current + 1
          item

  let forbiddenVault = Vault()
  forbiddenVault.Add({ Name = "Cursed Blade" })
  forbiddenVault.Add({ Name = "Orb of True Sight" })

  let scryer = VaultIterator(forbiddenVault)
  while scryer.HasNext() do
      printfn "Scried: %s" (scryer.Next().Name)

  // Idiomatic F# uses seq expressions
  let seqScry = seq { for i in 0 .. forbiddenVault.Count - 1 do yield forbiddenVault.Get(i) }
  for artifact in seqScry do
      printfn "Idiomatic Scry: %s" artifact.Name
tags: [behavioral, iterator, fsharp, scrying]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

While the classical Iterator creates a distinct traversal object, the F# magus frequently relies on `seq` (IEnumerable) and sequence expressions to glide through aetherial collections seamlessly.
