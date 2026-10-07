---
title: "The Strategy: Algorithmic Grimoires"
description: "Defining a family of algorithms, encapsulating each, and making them interchangeable."
type: idris
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Tactical-Weaving"
formula: |2
  module Strategy
  
  -- The Strategy
  CombatTactic : Type
  CombatTactic = Nat -> Nat -> Nat
  
  offensiveTactic : CombatTactic
  offensiveTactic power defense = power * 2 - defense
  
  defensiveTactic : CombatTactic
  defensiveTactic power defense = power + (defense * 2)
  
  -- The Context
  executeTactic : CombatTactic -> Nat -> Nat -> Nat
  executeTactic tactic p d = tactic p d
tags: [behavioral, higher-order-functions, algorithms]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

In the heat of astral warfare, rigid spellcasting is a death sentence. The Strategy pattern extracts the algorithm from the spell, defining it as an interchangeable `CombatTactic`. By passing these strategies as higher-order functions, an archmage can seamlessly swap from an `offensiveTactic` to a `defensiveTactic` on the fly. The Theorem Proving Pacts guarantee the signature is honored, preventing tactical collapse mid-invocation.
