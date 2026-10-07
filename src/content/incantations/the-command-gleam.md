---
title: The Command
description: Encapsulating spell invocations as first-class data.
type: gleam
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Evocation // Spell Storing"
formula: |2
  pub type SpellCommand {
    CastFireball(mana: Int)
    CastHeal(target: String)
  }

  pub fn invoke(command: SpellCommand) -> String {
    case command {
      CastFireball(m) -> "Dealt " <> gleam/int.to_string(m * 2) <> " damage!"
      CastHeal(t) -> "Healed " <> t <> "!"
    }
  }

  pub fn invoke_all(commands: List(SpellCommand)) -> List(String) {
    gleam/list.map(commands, invoke)
  }
tags: [evocation, command, gleam]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Command
Data types represent our commands. We can store, map, filter, and fold over them before passing them to the interpreter function.
