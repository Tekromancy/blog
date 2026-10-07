---
title: The Command
description: Reifying spells into data structures to be evaluated later.
type: haskell
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: Evocation // Storage
formula: |
  module Command where
  data Command = Print String | Beep
  execute :: Command -> IO ()
  execute (Print s) = putStrLn s
  execute Beep = putStrLn "BEEP!"
tags: [command, adt, behavioral]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
