---
title: The Facade
description: Provide a unified interface to a set of interfaces in a theory, hiding the underlying complexity of the proof system.
type: isabelle
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Transmutation // Simplification"
formula: |2
  theory Facade
    imports Main
  begin
  
  definition complex_subsystem_a :: "nat \<Rightarrow> nat" where "complex_subsystem_a x = x ^ 2"
  definition complex_subsystem_b :: "nat \<Rightarrow> nat" where "complex_subsystem_b x = x * 3"
  
  definition magic_facade :: "nat \<Rightarrow> nat" where
    "magic_facade x = complex_subsystem_a (complex_subsystem_b x) + 10"
  
  end
tags: [isabelle, hol, transmutation, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
