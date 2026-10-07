---
title: The Primordial Strategy
description: Swapping combat doctrines mid-ritual without altering the battle matrix.
type: c
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Universal // Martial Magic"
formula: |2
  #include <stdio.h>

  typedef struct {
      void (*execute_tactic)(void);
  } CombatStrategy;

  void aggressive_tactic(void) { printf("All out magical assault!\n"); }
  void defensive_tactic(void) { printf("Raising a barrier of thorns!\n"); }

  typedef struct {
      CombatStrategy* strategy;
  } WarGolem;

  void golem_fight(WarGolem* golem) {
      if (golem->strategy) {
          golem->strategy->execute_tactic();
      }
  }

  int main() {
      CombatStrategy aggro = { aggressive_tactic };
      CombatStrategy defend = { defensive_tactic };

      WarGolem golem = { &aggro };
      printf("Engaging enemy...\n");
      golem_fight(&golem);

      printf("Health critical, switching tactics...\n");
      golem.strategy = &defend;
      golem_fight(&golem);

      return 0;
  }
tags: [c, behavioral, strategy, interchangeable]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Primordial Strategy isolates algorithms of war. A War Golem simply possesses a pointer to a `CombatStrategy`. By dynamically reassigning this pointer at runtime, the Golem's nature shifts flawlessly from aggression to defense without a single conditional check.
