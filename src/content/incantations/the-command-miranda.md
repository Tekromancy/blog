---
title: The Command of the Ancestral Monad
description: Encapsulating a pure invocation as an object within the Ancestral Monad.
type: miranda
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Ancestral Monad"
formula: |2
  || The Command pattern stores pure functions as executable invocations.
  
  command ::= Cmd (num -> num)
  
  execute :: command -> num -> num
  execute (Cmd f) x = f x
  
  inc_cmd :: command
  inc_cmd = Cmd (\x -> x + 1)
  
  dec_cmd :: command
  dec_cmd = Cmd (\x -> x - 1)
  
  run_commands :: [command] -> num -> num
  run_commands [] val = val
  run_commands (c:cs) val = run_commands cs (execute c val)
tags: [miranda, behavioral, command, ancestral-monad]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
