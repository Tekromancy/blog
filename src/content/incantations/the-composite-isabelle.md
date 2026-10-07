---
title: The Composite
description: Compose logical structures into tree structures to represent part-whole hierarchies of enchantments.
type: isabelle
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Transmutation // Assemblage"
formula: |2
  theory Composite
    imports Main
  begin
  
  datatype enchantment =
      Leaf_Enchantment string
    | Composite_Enchantment "enchantment list"
  
  fun evaluate_enchantment :: "enchantment \<Rightarrow> nat" where
    "evaluate_enchantment (Leaf_Enchantment _) = 1"
  | "evaluate_enchantment (Composite_Enchantment es) = sum_list (map evaluate_enchantment es)"
  
  end
tags: [isabelle, hol, transmutation, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
