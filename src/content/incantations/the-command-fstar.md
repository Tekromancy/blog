---
title: The Command of Golem Instructions
description: Encapsulating golem commands as objects for verified execution.
type: fstar
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Transmutation // Golemancy"
formula: |2
  module Command
  
  type golem_state = { energy: nat; position: int }
  
  type command = golem_state -> golem_state
  
  let move_forward : command = fun s ->
    if s.energy > 0 then { energy = s.energy - 1; position = s.position + 1 }
    else s
    
  let recharge : command = fun s ->
    { s with energy = s.energy + 10 }
    
  let rec execute_all (cmds: list command) (s: golem_state) : golem_state =
    match cmds with
    | [] -> s
    | c :: t -> execute_all t (c s)
tags: [command, golem, state-transitions]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Golem commands are modeled as state-transition functions, strictly enforcing that energy cannot be negative.
