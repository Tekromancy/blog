---
title: The Mediator
description: Define an object that encapsulates how a set of logical objects interact.
type: isabelle
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Abjuration // Orchestration"
formula: |2
  theory Mediator
    imports Main
  begin
  
  datatype component = Mage | Warrior
  
  record mediator =
    notify :: "component \<Rightarrow> string \<Rightarrow> string"
  
  definition battle_mediator :: mediator where
    "battle_mediator = \<lparr> 
      notify = (\<lambda>sender event. if event = ''Attack'' then ''Counterattack'' else ''Idle'') 
    \<rparr>"
  
  end
tags: [isabelle, hol, abjuration, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
