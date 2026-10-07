---
title: The Observer
description: Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified automatically.
type: isabelle
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Perception"
formula: |2
  theory Observer
    imports Main
  begin
  
  type_synonym observer = "string \<Rightarrow> string list"
  
  record subject =
    observers :: "observer list"
    state :: string
  
  definition notify_all :: "subject \<Rightarrow> string list list" where
    "notify_all sub = map (\<lambda>obs. obs (state sub)) (observers sub)"
  
  end
tags: [isabelle, hol, divination, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
