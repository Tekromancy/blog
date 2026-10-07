---
title: Command in Dhall
description: Reify spells as data structures to be evaluated deterministically.
type: dhall
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Reification"
formula: |2
  let Command = < Cast : Text | Dispels : Text | Wait >
  
  let execute = \(c : Command) ->
        merge
          { Cast = \(s : Text) -> "Casting " ++ s
          , Dispels = \(s : Text) -> "Dispelling " ++ s
          , Wait = "Waiting..."
          }
          c
  
  in  execute (Command.Cast "Halting Fire")
tags: [dhall, halting, runes, configuration, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The **Command** pattern is a core tenet of configuration-as-code languages like Dhall. Rather than imperatively running scripts, one declares union types that represent desired states or actions. The interpreter function safely exhausts all possibilities of the union, proving that no command goes unhandled.
