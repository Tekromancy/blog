---
title: The Strategy
description: Define a family of algorithms, encapsulate each one, and make them interchangeable.
type: isabelle
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Tactics"
formula: |2
  theory Strategy
    imports Main
  begin
  
  type_synonym combat_strategy = "nat \<Rightarrow> nat \<Rightarrow> nat"
  
  definition aggressive_strategy :: combat_strategy where
    "aggressive_strategy power defense = power * 2"
  
  definition defensive_strategy :: combat_strategy where
    "defensive_strategy power defense = power + defense"
  
  record combatant =
    strategy :: combat_strategy
    power :: nat
    defense :: nat
  
  definition execute_strategy :: "combatant \<Rightarrow> nat" where
    "execute_strategy c = strategy c (power c) (defense c)"
  
  end
tags: [isabelle, hol, divination, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
