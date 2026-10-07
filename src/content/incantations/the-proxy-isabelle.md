---
title: The Proxy
description: Provide a surrogate or placeholder for a logical construct to control access or defer its evaluation.
type: isabelle
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Transmutation // Illusion"
formula: |2
  theory Proxy
    imports Main
  begin
  
  record secure_spell =
    secret_incantation :: string
  
  definition proxy_cast :: "secure_spell \<Rightarrow> string \<Rightarrow> string option" where
    "proxy_cast spell password = 
      (if password = ''mellon'' then Some (secret_incantation spell) else None)"
  
  end
tags: [isabelle, hol, transmutation, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
