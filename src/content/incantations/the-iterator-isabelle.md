---
title: The Iterator
description: Provide a way to access the elements of an aggregate mathematical object sequentially without exposing its underlying representation.
type: isabelle
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Abjuration // Enumeration"
formula: |2
  theory Iterator
    imports Main
  begin
  
  record 'a iterator =
    has_next :: "bool"
    next_val :: "'a option"
    step :: "'a iterator"
  
  fun list_iterator :: "'a list \<Rightarrow> 'a iterator" where
    "list_iterator [] = \<lparr> has_next = False, next_val = None, step = undefined \<rparr>"
  | "list_iterator (x#xs) = \<lparr> has_next = True, next_val = Some x, step = list_iterator xs \<rparr>"
  
  end
tags: [isabelle, hol, abjuration, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
