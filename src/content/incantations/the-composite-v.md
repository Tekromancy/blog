---
title: "The Composite Sigil"
description: "Treating a single ward and a complex web of wards uniformly."
type: v
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Illusion // Fractal Patterns"
formula: |2
  module main

  interface Component {
  	cast() int
  }

  struct LeafWard {
  	mana_cost int
  }
  fn (w LeafWard) cast() int {
  	return w.mana_cost
  }

  struct CompositeWard {
  mut:
  	children []Component
  }
  fn (mut w CompositeWard) add(c Component) {
  	w.children << c
  }
  fn (w CompositeWard) cast() int {
  	mut total := 0
  	for child in w.children {
  		total += child.cast()
  	}
  	return total
  }

  fn main() {
  	w1 := LeafWard{mana_cost: 10}
  	w2 := LeafWard{mana_cost: 20}

  	mut macro_ward := CompositeWard{}
  	macro_ward.add(w1)
  	macro_ward.add(w2)

  	mut grand_ward := CompositeWard{}
  	grand_ward.add(macro_ward)
  	grand_ward.add(LeafWard{mana_cost: 50})

  	println("Total Grand Ward cost: \${grand_ward.cast()}")
  }
tags: [vlang, composite, structural, fractals]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Composite Sigil

The fractal nature of magic requires that a single rune be treatable the exact same way as a macro-matrix of runes. The Composite spell forms tree structures of `Component` interfaces. Because V handles interfaces cleanly, traversing the magical tree is highly efficient, avoiding deep pointer chasing.
