---
title: The Abstract Factory
description: Conjure families of related objects through higher-order logic interfaces without specifying their concrete theories.
type: isabelle
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Abstraction"
formula: |2
  theory AbstractFactory
    imports Main
  begin
  
  record ('a, 'b) abstract_factory =
    create_spell :: "unit \<Rightarrow> 'a"
    create_ward :: "unit \<Rightarrow> 'b"
  
  definition fire_factory :: "(string, string) abstract_factory" where
    "fire_factory = \<lparr> 
      create_spell = (\<lambda>_. ''Fireball''), 
      create_ward = (\<lambda>_. ''Flame Shield'') 
    \<rparr>"
  
  definition ice_factory :: "(string, string) abstract_factory" where
    "ice_factory = \<lparr> 
      create_spell = (\<lambda>_. ''Frost Nova''), 
      create_ward = (\<lambda>_. ''Ice Barrier'') 
    \<rparr>"
  
  end
tags: [isabelle, hol, conjuration, design-patterns]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
