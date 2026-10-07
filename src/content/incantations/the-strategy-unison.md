---
title: The Strategy
description: Define a family of algorithms, encapsulate each one, and make them interchangeable.
type: unison
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Tactical Casting"
formula: |2
  type DamageStrategy = Nat -> Nat
  
  fireStrategy : DamageStrategy
  fireStrategy base = base + 50
  
  iceStrategy : DamageStrategy
  iceStrategy base = base * 2
  
  castAttack : DamageStrategy -> Nat -> Text
  castAttack strategy baseDamage =
    finalDamage = strategy baseDamage
    "Dealt " ++ Nat.toText finalDamage ++ " damage!"
tags: [behavioral, strategy, unison, higher-order-functions]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Strategy pattern is the essence of functional programming. Instead of encapsulating algorithms inside objects, the Unison mage defines a type alias for the spell's tactical component (`DamageStrategy`) and passes the specific function as an argument. The `castAttack` function remains oblivious to the elemental nature of the attack, seamlessly adopting whatever strategy is woven into its invocation.
