---
title: The Spellbook Interchange
description: Define a family of interchangeable algorithms, encapsulating each one dynamically.
type: dart
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: Evocation // Tactical Casting
formula: |
  abstract class DamageStrategy {
    int calculateDamage(int baseDamage);
  }
  
  class CriticalStrike implements DamageStrategy {
    @override
    int calculateDamage(int baseDamage) => baseDamage * 2;
  }
  
  class PoisonVampirism implements DamageStrategy {
    @override
    int calculateDamage(int baseDamage) {
      print('Siphoning life force...');
      return baseDamage + 5;
    }
  }
  
  class Mage {
    DamageStrategy strategy;
    Mage(this.strategy);
    
    void castSpell() {
      final damage = strategy.calculateDamage(10);
      print('Dealt $damage damage.');
    }
  }
  
  void main() {
    final mage = Mage(CriticalStrike());
    mage.castSpell();
    
    mage.strategy = PoisonVampirism(); // Hot-swap the algorithmic strategy
    mage.castSpell();
  }
tags: [dart, strategy, algorithm, tactical]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

A master tactician never brings only one spell to a duel. The Strategy pattern allows you to define a family of algorithms, put them in interchangeable spellbooks, and hot-swap them at runtime. The execution logic belongs to the strategy, keeping the caster clean.
