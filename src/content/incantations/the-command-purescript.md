---
title: The Command of Web Runes
description: Encapsulate a web rune invocation as an object, allowing logging and queuing.
type: purescript
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Sealed Decrees"
formula: |2
  module Arcane.Command where
  import Prelude
  import Effect (Effect)
  import Effect.Console (log)
  import Data.Foldable (sequence_)

  -- The Command is encapsulated as an Effect
  type ArcaneCommand = Effect Unit

  invokeLightning :: String -> ArcaneCommand
  invokeLightning target = log $ "Lightning strikes " <> target

  raiseDead :: Int -> ArcaneCommand
  raiseDead count = log $ "Raising " <> show count <> " undead minions."

  -- Invoker
  executeRituals :: Array ArcaneCommand -> Effect Unit
  executeRituals commands = do
    log "Beginning the grand sequence..."
    sequence_ commands
tags: [behavioral, command, purescript, runes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
