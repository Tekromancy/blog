---
title: The Chain of Responsibility
description: Avoid coupling the sender of a logical request to its receiver by giving multiple handlers a chance to process it.
type: isabelle
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Delegation"
formula: |2
  theory ChainOfResponsibility
    imports Main
  begin
  
  datatype request = Heal nat | Damage nat
  
  type_synonym handler = "request \<Rightarrow> request option"
  
  definition heal_handler :: handler where
    "heal_handler r = (case r of Heal n \<Rightarrow> None | _ \<Rightarrow> Some r)"
  
  definition chain_handlers :: "handler list \<Rightarrow> request \<Rightarrow> request option" where
    "chain_handlers hs req = foldl (\<lambda>r h. case r of None \<Rightarrow> None | Some req' \<Rightarrow> h req') (Some req) hs"
  
  end
tags: [isabelle, hol, abjuration, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
