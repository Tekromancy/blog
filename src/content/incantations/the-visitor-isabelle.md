---
title: The Visitor
description: Represent an operation to be performed on the elements of an object structure.
type: isabelle
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Inspection"
formula: |2
  theory Visitor
    imports Main
  begin
  
  datatype element = 
      Rune string
    | Sigil nat
  
  record 'a visitor =
    visit_rune :: "string \<Rightarrow> 'a"
    visit_sigil :: "nat \<Rightarrow> 'a"
  
  fun accept :: "element \<Rightarrow> 'a visitor \<Rightarrow> 'a" where
    "accept (Rune s) v = visit_rune v s"
  | "accept (Sigil n) v = visit_sigil v n"
  
  end
tags: [isabelle, hol, divination, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
