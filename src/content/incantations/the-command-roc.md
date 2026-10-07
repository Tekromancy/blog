---
title: The Command of Runes
description: Encapsulating spell invocations as data structures to be executed or delayed.
type: roc
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Evocation // Runecraft"
tags: [fast-functional-wards, roc, command]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
formula: |2
  interface RuneCommand
      exposes [Command, executeCommands]
      imports []

  Command : [
      Strike { damage : U64 },
      Heal { amount : U64 },
      Shield { duration : U64 }
  ]

  State : { health : I64, armor : U64 }

  applyCommand : State, Command -> State
  applyCommand = \state, cmd ->
      when cmd is
          Strike { damage } -> { state & health: state.health - Num.toI64 damage }
          Heal { amount } -> { state & health: state.health + Num.toI64 amount }
          Shield { duration } -> { state & armor: state.armor + duration }

  executeCommands : State, List Command -> State
  executeCommands = \initialState, commands ->
      List.walk commands initialState applyCommand
---
