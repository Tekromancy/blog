---
title: The Strategy
description: Intermix distinct targeting algorithms for your arcane missiles.
type: python
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Tactical Warfare"
formula: |2
  from abc import ABC, abstractmethod

  class TargetingStrategy(ABC):
      @abstractmethod
      def select_target(self, entities: list) -> str: pass

  class WeakestFirst(TargetingStrategy):
      def select_target(self, entities: list) -> str:
          return sorted(entities, key=lambda x: x['hp'])[0]['name']

  class NearestFirst(TargetingStrategy):
      def select_target(self, entities: list) -> str:
          return sorted(entities, key=lambda x: x['distance'])[0]['name']

  class ArcaneMissile:
      def __init__(self, strategy: TargetingStrategy):
          self.strategy = strategy

      def fire(self, entities: list):
          target = self.strategy.select_target(entities)
          print(f"Missile streaks toward {target}!")

  # enemies = [{'name': 'Goblin', 'hp': 10, 'distance': 50}, {'name': 'Troll', 'hp': 100, 'distance': 10}]
  # missile = ArcaneMissile(WeakestFirst())
  # missile.fire(enemies)
  # missile.strategy = NearestFirst()
  # missile.fire(enemies)
tags: [behavioral, python, evocation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Strategy pattern defines a family of tactical algorithms, encapsulates them, and makes them interchangeable. An Evoker can dynamically switch an Arcane Missile's tracking core mid-flight—shifting from seeking the weakest soul to striking the nearest physical threat without altering the missile's base construct.
