---
title: The Visitor Astral Projection
description: Representing an operation to be performed on the elements of an object structure without modifying the classes.
type: fsharp
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Projection"
formula: |2
  // In F#, the Visitor pattern is usually replaced by Discriminated Unions and Pattern Matching

  type ArcaneStructure =
      | Obelisk of power: int
      | LeylineNode of active: bool
      | ManaFont of capacity: int

  // The 'Visitor' function
  let analyzeStructure (structure: ArcaneStructure) =
      match structure with
      | Obelisk p -> printfn "Analyzing Obelisk. Power level: %d" p
      | LeylineNode a -> printfn "Analyzing Leyline. Is active: %b" a
      | ManaFont c -> printfn "Analyzing Mana Font. Capacity: %d" c

  let structures = [
      Obelisk 100
      LeylineNode true
      ManaFont 500
  ]

  structures |> List.iter analyzeStructure
tags: [behavioral, visitor, fsharp, projection]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The traditional Visitor pattern relies on double-dispatch and heavy interface coupling. The F# magus bypasses this entirely using Discriminated Unions and Pattern Matching, allowing the Astral Projection to analyze structures securely and elegantly without invading their OOP definitions.
