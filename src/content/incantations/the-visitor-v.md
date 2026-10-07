---
title: "The Visitor Sigil"
description: "Injecting new analytical spells into an entire hierarchy of distinct nodes."
type: v
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Meta-Analysis"
formula: |2
  module main

  interface Node {
  	accept(v Visitor)
  }

  struct ManaCore { power int }
  fn (c ManaCore) accept(v Visitor) { v.visit_mana_core(c) }

  struct DataCrystal { bytes int }
  fn (c DataCrystal) accept(v Visitor) { v.visit_data_crystal(c) }

  interface Visitor {
  	visit_mana_core(c ManaCore)
  	visit_data_crystal(c DataCrystal)
  }

  struct DiagnosticVisitor {}
  fn (v DiagnosticVisitor) visit_mana_core(c ManaCore) {
  	println("Diagnosing ManaCore. Power level: \$c.power")
  }
  fn (v DiagnosticVisitor) visit_data_crystal(c DataCrystal) {
  	println("Diagnosing DataCrystal. Storage: \$c.bytes MB")
  }

  fn main() {
  	nodes := [Node(ManaCore{power: 9000}), Node(DataCrystal{bytes: 512})]
  	visitor := DiagnosticVisitor{}

  	for node in nodes {
  		node.accept(visitor)
  	}
  }
tags: [vlang, visitor, behavioral, inspection]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
# The Visitor Sigil

When managing an array of heterogeneous network nodes, adding new analytical features to each core struct violates the open/closed principle. The Visitor allows you to "walk" the object structure, passing a powerful diagnostic entity into each node, retaining blazing-fast type safety while completely decoupling the algorithm from the data.
