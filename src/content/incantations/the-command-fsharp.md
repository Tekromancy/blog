---
title: The Command Geas
description: Encapsulating a spell request as an object, allowing logging, queuing, and undoing of arcane decrees.
type: fsharp
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: Enchantment // Geas
formula: |
  type ICommand =
      abstract member Execute: unit -> unit
      abstract member Undo: unit -> unit

  type Golem() =
      member _.MoveForward() = printfn "Golem steps forward heavily."
      member _.MoveBackward() = printfn "Golem retreats one step."

  type MoveCommand(golem: Golem) =
      interface ICommand with
          member _.Execute() = golem.MoveForward()
          member _.Undo() = golem.MoveBackward()

  type ArchmageInvoker() =
      let mutable history: ICommand list = []
      
      member _.Invoke(cmd: ICommand) =
          cmd.Execute()
          history <- cmd :: history
          
      member _.UndoLast() =
          match history with
          | head :: tail -> 
              head.Undo()
              history <- tail
          | [] -> printfn "No spells to undo."

  let stoneGolem = Golem()
  let march = MoveCommand(stoneGolem)
  let commander = ArchmageInvoker()

  commander.Invoke(march)
  commander.UndoLast()
tags: [behavioral, command, fsharp, geas]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Command Geas transforms an imperative directive into an object or closure. By keeping a ledger of these bindings, an Archmage can rewind time, compelling constructs to reverse their actions.
