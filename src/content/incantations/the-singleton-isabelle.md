---
title: The Singleton
description: Ensure that a theoretical construct has only one instance, and provide a global point of access to it.
type: isabelle
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Conjuration // Monism"
formula: |2
  theory Singleton
    imports Main
  begin
  
  datatype unique_grimoire = TheGrimoire
  
  lemma only_one_grimoire: "\<forall>x y. x = (y :: unique_grimoire)"
    by (metis unique_grimoire.exhaust)
  
  end
tags: [isabelle, hol, conjuration, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
