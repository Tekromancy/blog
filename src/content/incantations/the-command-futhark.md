---
title: "The Command: Array-Based Operations"
description: "Reify operations as sum types to be mapped across the GPU void."
type: futhark
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Divination // Flow"
formula: |2
  type command = #add i32 | #mul i32
  
  let exec (cmd: command) (acc: i32) =
    match cmd
    case #add v -> acc + v
    case #mul v -> acc * v
    
  let run_commands [n] (cmds: [n]command) (init: i32) : i32 =
    loop acc = init for c in cmds do exec c acc
tags: [futhark, command, sum-types]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
