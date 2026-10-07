---
title: The Decorator
description: Attach additional responsibilities to a theorem or function dynamically without modifying its core truth.
type: isabelle
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Enhancement"
formula: |2
  theory Decorator
    imports Main
  begin
  
  type_synonym spell = "nat \<Rightarrow> nat"
  
  definition base_spell :: spell where
    "base_spell mana = mana * 2"
  
  definition empower_decorator :: "spell \<Rightarrow> spell" where
    "empower_decorator s = (\<lambda>mana. s mana + 50)"
  
  definition echoing_decorator :: "spell \<Rightarrow> spell" where
    "echoing_decorator s = (\<lambda>mana. s (s mana))"
  
  end
tags: [isabelle, hol, transmutation, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
