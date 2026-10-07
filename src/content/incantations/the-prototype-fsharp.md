---
title: The Prototype Clone
description: Duplicating complex spell matrices without invoking the original weaving costs.
type: fsharp
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: Illusion // Biomancy
formula: |
  open System

  type SpellMatrix = 
      { Sigil: string; Complexity: int; ID: Guid }
      member this.Clone() =
          // In F#, records are copied easily with the 'with' expression
          // Generate a new ID for the clone
          { this with ID = Guid.NewGuid() }

  let originalSpell = { Sigil = "Eldritch Blast"; Complexity = 8; ID = Guid.NewGuid() }
  let echoedSpell = originalSpell.Clone()

  printfn "Original: %A" originalSpell.ID
  printfn "Echo: %A" echoedSpell.ID
tags: [creational, prototype, fsharp, cloning]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Functional records inherently support the Prototype pattern via `with` expressions. Cloning a complex sigil matrix is a trivial act of structural sharing, conserving both mana and memory.
