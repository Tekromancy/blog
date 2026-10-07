---
title: The Abstract Factory of the Prolog Oracle
description: Conjure families of related ancient artifacts through logic queries.
type: prolog
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: Conjuration // Rulemancy
formula: |
  % The Universal Truths of Artifact Creation
  
  % Abstract factories (or rather, the predicates defining the origin rules)
  factory(elven_forge).
  factory(dwarven_forge).
  
  % Product A: Swords
  create_sword(elven_forge, mithril_blade).
  create_sword(dwarven_forge, adamantine_cleaver).
  
  % Product B: Shields
  create_shield(elven_forge, star_buckler).
  create_shield(dwarven_forge, deep_bulwark).
  
  % Client query to summon a matching set
  equip_hero(Factory, Sword, Shield) :-
      factory(Factory),
      create_sword(Factory, Sword),
      create_shield(Factory, Shield).
  
  % ?- equip_hero(elven_forge, Sword, Shield).
  % Sword = mithril_blade,
  % Shield = star_buckler.
tags: [abstract-factory, creational, prolog, logic, oracle]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
