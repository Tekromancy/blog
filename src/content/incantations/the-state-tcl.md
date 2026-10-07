---
title: The State
description: Allows a magical construct to alter its behavior radically when its internal resonance changes.
type: tcl
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Polymorphism"
formula: |2
  oo::class create ConstructState {
      method attack {} { error "Not implemented" }
  }

  oo::class create DormantState {
      superclass ConstructState
      method attack {} { puts "The golem remains perfectly still." }
  }

  oo::class create FrenzyState {
      superclass ConstructState
      method attack {} { puts "The golem lashes out with plasma claws!" }
  }

  oo::class create CyberGolem {
      variable state
      constructor {} { set state [DormantState new] }
      method setState {s} { set state $s }
      method performAction {} { $state attack }
  }

  set golem [CyberGolem new]
  $golem performAction

  puts "Injecting corrupted logic..."
  $golem setState [FrenzyState new]
  $golem performAction
tags: [behavioral, state, transmutation, polymorphism]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The State

A cyber-golem operates under entirely different paradigms depending on its internal heat signature and threat level. The State pattern maps these discrete phases into separate objects, allowing the overarching entity to instantly mutate its interface and methods as its internal reality shifts.
