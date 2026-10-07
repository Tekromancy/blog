---
title: "The Interpreter: Automata within the Grid"
description: "Evaluate arcane opcodes on state vectors simultaneously."
type: futhark
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Flow"
formula: |2
  let interpret [n] (tape: [n]i32) : i32 =
    loop (acc, pc) = (0, 0i64) while pc < n do
      let op = tape[pc]
      in if op == 1 then (acc + tape[pc+1], pc + 2)
         else if op == 2 then (acc * tape[pc+1], pc + 2)
         else (acc, pc + 1)
tags: [futhark, interpreter, state-machine]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
