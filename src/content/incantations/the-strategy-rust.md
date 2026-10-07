---
title: Strategy of the Tactician's Codex
description: Define a family of algorithms, encapsulate each one, and make them interchangeable.
type: rust
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Tactical-insight"
formula: |2
  pub trait PathfindingStrategy {
      fn route(&self, start: &str, end: &str);
  }

  pub struct StealthRoute;
  impl PathfindingStrategy for StealthRoute {
      fn route(&self, start: &str, end: &str) { println!("Routing {} to {} via shadowy sub-nets.", start, end); }
  }

  pub struct AssaultRoute;
  impl PathfindingStrategy for AssaultRoute {
      fn route(&self, start: &str, end: &str) { println!("Blazing direct path from {} to {}.", start, end); }
  }

  pub struct Navigator {
      strategy: Box<dyn PathfindingStrategy>,
  }
  impl Navigator {
      pub fn set_strategy(&mut self, s: Box<dyn PathfindingStrategy>) { self.strategy = s; }
      pub fn execute(&self) { self.strategy.route("Node Alpha", "Mainframe"); }
  }
tags: [behavioral, strategy, divination, algorithms]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Tactician's Codex stores a vast array of algorithms, from stealth routing to outright frontal assault vectoring. The Strategy pattern allows the cyber-mage to encapsulate these behaviors and hot-swap them at runtime.

Instead of hardcoding complex navigation logic into the drone's chassis, the drone merely delegates the decision-making to the currently active Strategy. As the grid environment shifts, the mage swaps the algorithm to match the threat.
