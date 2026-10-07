---
title: The Adapter
description: Convert the interface of a theory into another interface the clients expect, bridging incompatible realms.
type: isabelle
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Translation"
formula: |2
  theory Adapter
    imports Main
  begin
  
  record old_spell_system =
    cast_old :: "nat \<Rightarrow> string"
  
  record new_spell_system =
    cast_new :: "int \<Rightarrow> string"
  
  definition adapt_system :: "old_spell_system \<Rightarrow> new_spell_system" where
    "adapt_system old = \<lparr> cast_new = (\<lambda>mana. cast_old old (nat mana)) \<rparr>"
  
  end
tags: [isabelle, hol, transmutation, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
