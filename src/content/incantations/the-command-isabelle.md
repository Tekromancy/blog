---
title: The Command
description: Encapsulate a logical request as an object, thereby letting you parameterize clients with different requests.
type: isabelle
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Abjuration // Imperative"
formula: |2
  theory Command
    imports Main
  begin
  
  datatype command = 
      Teleport "nat * nat"
    | Cast "string"
  
  type_synonym state = "nat * nat * string list"
  
  fun execute_command :: "command \<Rightarrow> state \<Rightarrow> state" where
    "execute_command (Teleport (x, y)) (_, _, log) = (x, y, log)"
  | "execute_command (Cast spell) (x, y, log) = (x, y, spell # log)"
  
  end
tags: [isabelle, hol, abjuration, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
