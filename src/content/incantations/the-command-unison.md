---
title: The Command
description: Encapsulate a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations.
type: unison
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Delayed Casting"
formula: |2
  -- A command is simply a suspended computation (a thunk).
  type Command = () -> Text
  
  igniteRune : Command
  igniteRune _ = "Rune ignited!"
  
  shatterCrystal : Command
  shatterCrystal _ = "Crystal shattered!"
  
  -- The Invoker
  executeGrimoire : [Command] -> [Text]
  executeGrimoire cmds = List.map (cmd -> !cmd) cmds
tags: [behavioral, command, unison, thunks, higher-order-functions]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

To delay the execution of a spell, the Unison mage does not need to construct elaborate command objects. Instead, they use a "thunk" — a function taking the unit type `()`. These suspended invocations can be stored in lists (like pages in a Grimoire), passed around, and evaluated exactly when the arcane alignment is correct by applying the bang `!` operator.
