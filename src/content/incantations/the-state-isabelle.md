---
title: The State
description: Allow an object to alter its behavior when its internal state changes. The object will appear to change its class.
type: isabelle
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Metamorphosis"
formula: |2
  theory State
    imports Main
  begin
  
  datatype wizard_phase = Apprentice | Master | Archmage
  
  fun cast_power :: "wizard_phase \<Rightarrow> nat" where
    "cast_power Apprentice = 10"
  | "cast_power Master = 50"
  | "cast_power Archmage = 100"
  
  end
tags: [isabelle, hol, transmutation, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
