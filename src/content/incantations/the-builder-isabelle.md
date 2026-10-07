---
title: The Builder
description: Construct complex logical entities step by step, separating the formulation of the spell from its underlying representation.
type: isabelle
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Conjuration // Synthesism"
formula: |2
  theory Builder
    imports Main
  begin
  
  datatype spell_component = Verbal | Somatic | Material
  
  record spell_builder =
    components :: "spell_component list"
    mana_cost :: nat
  
  definition empty_builder :: spell_builder where
    "empty_builder = \<lparr> components = [], mana_cost = 0 \<rparr>"
  
  definition add_component :: "spell_component \<Rightarrow> spell_builder \<Rightarrow> spell_builder" where
    "add_component c b = b \<lparr> components := c # components b, mana_cost := mana_cost b + 10 \<rparr>"
  
  definition build_spell :: "spell_builder \<Rightarrow> spell_builder" where
    "build_spell = add_component Verbal o add_component Somatic"
  
  end
tags: [isabelle, hol, conjuration, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
