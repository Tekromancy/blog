---
title: "The Strategy Sigil"
description: "Hot-swapping spell targeting algorithms at runtime without recompiling the core routine."
type: v
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Tactics"
formula: |2
  module main

  interface TargetingStrategy {
  	calculate_route(target string) string
  }

  struct DirectStrike {}
  fn (s DirectStrike) calculate_route(target string) string {
  	return "Blasting a linear path straight to \$target"
  }

  struct ArcingTrajectory {}
  fn (s ArcingTrajectory) calculate_route(target string) string {
  	return "Calculating parabolic curve to bypass shields towards \$target"
  }

  struct SpellCannon {
  mut:
  	strategy TargetingStrategy
  }
  fn (c SpellCannon) fire(target string) {
  	route := c.strategy.calculate_route(target)
  	println("Firing: \$route")
  }

  fn main() {
  	mut cannon := SpellCannon{strategy: DirectStrike{}}
  	cannon.fire("Rogue Drone")

  	cannon.strategy = ArcingTrajectory{}
  	cannon.fire("Shielded Bunker")
  }
tags: [vlang, strategy, behavioral, algorithms]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Strategy Sigil

Algorithms dictate the behavior of spells. The Strategy pattern defines a family of algorithms, encapsulates each one within a concrete structure, and makes them interchangeable. Rather than altering the `SpellCannon`, an Archmage simply unplugs one tactical shard and inserts another, dynamically shifting the flow of battle.
