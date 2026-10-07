---
title: The Flyweight
description: Use sharing to support large numbers of fine-grained logical assertions efficiently.
type: isabelle
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Efficiency"
formula: |2
  theory Flyweight
    imports Main
  begin
  
  datatype particle_type = FireSpark | IceShard
  
  record flyweight_particle =
    ptype :: particle_type
    shared_texture :: string
  
  definition particle_factory :: "particle_type \<Rightarrow> flyweight_particle" where
    "particle_factory pt = (case pt of
        FireSpark \<Rightarrow> \<lparr> ptype = FireSpark, shared_texture = ''red.png'' \<rparr>
      | IceShard \<Rightarrow> \<lparr> ptype = IceShard, shared_texture = ''blue.png'' \<rparr>)"
  
  end
tags: [isabelle, hol, transmutation, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
