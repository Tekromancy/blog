---
title: "The Singleton Sigil"
description: "A monolith of power, guaranteeing a single nexus point for mana distribution."
type: v
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Nexus Control"
formula: |2
  module main

  // Vlang heavily discourages global state and traditional Singletons.
  // Instead, passing a mutable reference of a shared struct is the idiomatic "ward".
  // However, if one MUST ensure a module-level singular instance:

  @[heap]
  struct ManaNexus {
  mut:
  	level int
  }

  fn (mut n ManaNexus) draw_power(amount int) {
  	n.level -= amount
  	println("Drew \$amount power. Remaining: \$n.level")
  }

  // Typically, you instantiate it once in `main` and pass it around.
  fn main() {
  	mut nexus := &ManaNexus{level: 1000}

  	// Function requiring the singleton
  	cast_spell(mut nexus)
  	cast_spell(mut nexus)
  }

  fn cast_spell(mut nexus ManaNexus) {
  	nexus.draw_power(50)
  }
tags: [vlang, singleton, creational, anti-pattern]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Singleton Sigil

In the pristine logic of V, the Singleton is often viewed as a forbidden curse—a dark pact with Global State. The true Vlang Archmage avoids pure Singletons, instead opting to create a solitary Nexus in the main invocation and passing its reference through the ley lines of the application. Safe, concurrent, and blazing fast.
