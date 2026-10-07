---
title: The Strategy Grimoire
description: Defining a family of algorithms, encapsulating each, and making them interchangeable during a duel.
type: fsharp
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Tactics"
formula: |2
  // In F#, strategies are often just first-class functions
  type DuelingTactic = int -> int -> string

  let aggressiveTactic : DuelingTactic = fun power armor ->
      sprintf "Attacking fiercely for %d damage against %d armor." (power * 2) armor

  let defensiveTactic : DuelingTactic = fun power armor ->
      sprintf "Striking cautiously for %d damage while maintaining %d armor." power (armor * 2)

  type Duelist(power, armor) =
      member _.Execute(tactic: DuelingTactic) =
          printfn "%s" (tactic power armor)

  let archmage = Duelist(50, 20)

  printfn "Phase 1:"
  archmage.Execute(aggressiveTactic)

  printfn "Phase 2:"
  archmage.Execute(defensiveTactic)
tags: [behavioral, strategy, fsharp, tactics]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

In the object-oriented world, Strategy requires vast hierarchies of interfaces. In F#, the Strategy pattern evaporates into the elegance of passing higher-order functions. The archmage merely swaps the tactical lambda mid-duel.
