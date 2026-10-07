---
title: The Memento
description: Without violating encapsulation, capture and externalize an object's internal state so that it can be restored later.
type: isabelle
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Abjuration // Chronomancy"
formula: |2
  theory Memento
    imports Main
  begin
  
  type_synonym memento = "nat * nat"
  
  record wizard_state =
    health :: nat
    mana :: nat
  
  definition save_state :: "wizard_state \<Rightarrow> memento" where
    "save_state st = (health st, mana st)"
  
  definition restore_state :: "memento \<Rightarrow> wizard_state" where
    "restore_state m = \<lparr> health = fst m, mana = snd m \<rparr>"
  
  end
tags: [isabelle, hol, abjuration, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
