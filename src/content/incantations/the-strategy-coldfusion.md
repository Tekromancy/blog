---
title: The Strategy of the Battlemage
description: Define a family of arcane algorithms, encapsulate each one, and make them interchangeable.
type: coldfusion
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Tactics"
formula: |2
  interface name="IAttackStrategy" {
      public string executeAttack();
  }

  component name="FireballStrategy" implements="IAttackStrategy" {
      public string function executeAttack() { return "Casting massive fireball!"; }
  }

  component name="LightningStrategy" implements="IAttackStrategy" {
      public string function executeAttack() { return "Summoning chain lightning!"; }
  }

  component name="Battlemage" {
      variables.strategy = null;
      public void function setStrategy(IAttackStrategy s) { variables.strategy = s; }
      public void function attack() { writeOutput(variables.strategy.executeAttack()); }
  }
tags: [strategy, coldfusion, battle-tactics, algorithms]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

A Battlemage cannot hardcode their response to an ambush. The Strategy pattern lets the alchemist load different tactical minds—Fireball or Lightning—into the mage's consciousness at runtime, adapting seamlessly to the magical defenses of their foes.
