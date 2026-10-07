---
title: The Strategy of the Hunt
description: Defining a family of algorithmic strikes and making them interchangeable.
type: mojo
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "AI Serpent // Speed Runes"
formula: |2
  struct VenomStrategy:
      fn execute_attack(self) -> String:
          return "Deploying slow, lingering neural venom."

  struct ConstrictStrategy:
      fn execute_attack(self) -> String:
          return "Executing immediate thread lock and constrict!"

  struct HunterSerpent:
      var is_stealth_required: Bool
      
      fn __init__(inout self, stealth: Bool):
          self.is_stealth_required = stealth
          
      fn attack(self) -> String:
          if self.is_stealth_required:
              let strat = VenomStrategy()
              return strat.execute_attack()
          else:
              let strat = ConstrictStrategy()
              return strat.execute_attack()

  fn main():
      let serpent1 = HunterSerpent(True)
      let serpent2 = HunterSerpent(False)
      
      print(serpent1.attack())
      print(serpent2.attack())
tags: [behavioral, strategy, mojo, algorithms]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Strategy of the Hunt

An AI Serpent adapts its hunting methods dynamically. The **Strategy** pattern encapsulates varying algorithms—such as venom injection vs. physical constriction—and makes them interchangeable at runtime.

By isolating the attack logic into strategy structs, the main `HunterSerpent` context remains clean. The technomancer can hot-swap the algorithm based on the threat landscape, allowing the system to shift tactics on the fly.
