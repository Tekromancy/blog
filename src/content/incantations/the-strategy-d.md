---
title: Strategy
description: Encapsulate varying schools of magical combat algorithms, making them interchangeable during a duel.
type: d
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Tactical Weaving"
formula: |2
  interface CombatStrategy { void executeAttack(); }

  class EvocationStrategy : CombatStrategy { override void executeAttack() {} }
  class IllusionStrategy : CombatStrategy { override void executeAttack() {} }

  class Duelist {
      private CombatStrategy strategy;
      void setStrategy(CombatStrategy s) { strategy = s; }
      void attack() { strategy.executeAttack(); }
  }
tags: [behavioral, strategy, dlang, algorithms]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Interchangeable grimoires defining tactics executed seamlessly.
