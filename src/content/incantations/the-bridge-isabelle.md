---
title: The Bridge
description: Decouple an abstraction from its implementation so that the two can vary independently across logical dimensions.
type: isabelle
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Integration"
formula: |2
  theory Bridge
    imports Main
  begin
  
  datatype element = Fire | Frost | Arcane
  
  record spell_implementation =
    render_effect :: "element \<Rightarrow> string"
  
  record spell_abstraction =
    impl :: spell_implementation
    cast :: "string"
  
  definition mk_spell :: "spell_implementation \<Rightarrow> element \<Rightarrow> spell_abstraction" where
    "mk_spell i e = \<lparr> impl = i, cast = render_effect i e \<rparr>"
  
  end
tags: [isabelle, hol, transmutation, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
