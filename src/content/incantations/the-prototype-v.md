---
title: "The Prototype Sigil"
description: "Cloning complex arcane patterns using exact memory replication."
type: v
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Cloning"
formula: |2
  module main

  interface Cloneable {
  	clone() Cloneable
  }

  struct SpellConstruct {
  	name  string
  	power int
  	runes []string
  }

  fn (s SpellConstruct) clone() Cloneable {
  	// Vlang's structs are immutable by default, making shallow/deep copies straightforward.
  	// Arrays in V are copied by value in assignments.
  	mut runes_copy := []string{cap: s.runes.len}
  	for r in s.runes {
  		runes_copy << r
  	}

  	return SpellConstruct{
  		name: s.name
  		power: s.power
  		runes: runes_copy
  	}
  }

  fn main() {
  	original := SpellConstruct{name: "Soul Burn", power: 9000, runes: ["Alpha", "Omega"]}
  	cloned := original.clone() as SpellConstruct

  	println("Original: \$original")
  	println("Cloned: \$cloned")
  }
tags: [vlang, prototype, creational, cloning]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Prototype Sigil

When compiling complex arrays of energy, conjuring from scratch costs precious CPU cycles. The Prototype sigil clones existing states perfectly. V's default immutability makes it exceptionally safe to rely on cloned structs, ensuring no accidental soul-bindings traverse between the original and the clone.
