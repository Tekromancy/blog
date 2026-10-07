---
title: The Builder Array
description: Constructing complex magical artifacts step-by-step through immutable transformations.
type: fsharp
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Artifice"
formula: |2
  type Artifact = { Core: string; Runes: string list; EnchantmentLevel: int }

  type ArtifactBuilder() =
      let mutable core = "Empty"
      let mutable runes = []
      let mutable level = 0

      member _.SetCore c = core <- c; ()
      member _.AddRune r = runes <- r :: runes; ()
      member _.SetLevel l = level <- l; ()

      member _.Build() =
          { Core = core; Runes = List.rev runes; EnchantmentLevel = level }

  // Idiomatic F# prefers functional updates over mutable builders:
  let createArtifact core = { Core = core; Runes = []; EnchantmentLevel = 0 }
  let withRune rune artifact = { artifact with Runes = artifact.Runes @ [rune] }
  let withLevel level artifact = { artifact with EnchantmentLevel = level }

  let amulet = 
      createArtifact "Dragon Heart"
      |> withRune "Fehu"
      |> withRune "Uruz"
      |> withLevel 5
tags: [creational, builder, fsharp, artifice]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

While traditional OOP invokes stateful builders, the F# magus employs record updates and the pipeline operator to forge artifacts. This ensures the magical weave remains immutable and thread-safe.
