---
title: The Prototype
description: Create new conceptual entities by cloning an existing prototypical entity in Higher-Order Logic.
type: isabelle
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Conjuration // Replication"
formula: |2
  theory Prototype
    imports Main
  begin
  
  record summon =
    creature_type :: string
    power_level :: nat
  
  definition clone_summon :: "summon \<Rightarrow> summon" where
    "clone_summon s = s"
  
  definition empower_clone :: "summon \<Rightarrow> summon" where
    "empower_clone s = s \<lparr> power_level := power_level s + 10 \<rparr>"
  
  end
tags: [isabelle, hol, conjuration, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
