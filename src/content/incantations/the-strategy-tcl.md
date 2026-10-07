---
title: The Strategy
description: Defines a family of combat algorithms, encapsulating each, and making them interchangeable at runtime.
type: tcl
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Tactics"
formula: |2
  oo::class create CombatTactic {
      method execute {target} { error "Not implemented" }
  }

  oo::class create StealthHack {
      superclass CombatTactic
      method execute {target} { puts "Silently siphoning data from $target." }
  }

  oo::class create BruteForce {
      superclass CombatTactic
      method execute {target} { puts "Hammering $target's ICE with kinetic blasts." }
  }

  oo::class create AttackVector {
      variable strategy
      method setStrategy {s} { set strategy $s }
      method assault {target} {
          $strategy execute $target
      }
  }

  set vector [AttackVector new]
  $vector setStrategy [StealthHack new]
  $vector assault "Corp Server"

  $vector setStrategy [BruteForce new]
  $vector assault "Security Node"
tags: [behavioral, strategy, tactics, interchangeable]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

# The Strategy

A true Tekromancer does not rely on a single vector of assault. The Strategy pattern detaches the algorithm from the invoker, allowing you to swap out your stealth protocol for a scorched-earth brute-force blast in the middle of execution based on environmental feedback.
