---
title: "The Builder Sigil"
description: "A step-by-step incantation for constructing complex runic matrices."
type: v
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Matrix Crafting"
formula: |2
  module main

  // Product
  struct RunicMatrix {
  mut:
  	core      string
  	energy    int
  	is_stable bool
  }

  // Builder Interface
  interface MatrixBuilder {
  mut:
  	set_core(core string)
  	infuse_energy(amount int)
  	stabilize()
  	build() RunicMatrix
  }

  // Concrete Builder
  struct BlazingSigilBuilder {
  mut:
  	matrix RunicMatrix
  }

  fn (mut b BlazingSigilBuilder) set_core(core string) {
  	b.matrix.core = core
  }
  fn (mut b BlazingSigilBuilder) infuse_energy(amount int) {
  	b.matrix.energy += amount
  }
  fn (mut b BlazingSigilBuilder) stabilize() {
  	b.matrix.is_stable = true
  }
  fn (mut b BlazingSigilBuilder) build() RunicMatrix {
  	return b.matrix
  }

  // Director
  struct ArchmageDirector {}
  fn (d ArchmageDirector) construct_standard_matrix(mut builder MatrixBuilder) RunicMatrix {
  	builder.set_core("Aether")
  	builder.infuse_energy(100)
  	builder.stabilize()
  	return builder.build()
  }

  fn main() {
  	mut builder := BlazingSigilBuilder{}
  	director := ArchmageDirector{}
  	matrix := director.construct_standard_matrix(mut builder)
  	println(matrix)
  }
tags: [vlang, builder, creational, matrix]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Builder Sigil

Constructing a runic matrix in Vlang requires precision. The Builder isolates the complexity of matrix weaving, allowing an Archmage to direct the flow of power step-by-step. The instant compile nature of V ensures that no unstable matrices are ever deployed to the grid.
