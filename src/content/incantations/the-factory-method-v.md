---
title: "The Factory Method Sigil"
description: "Delegates the conjuration of specific elemental spirits to sub-wards."
type: v
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Spirit Binding"
formula: |2
  module main

  interface Spirit {
  	manifest() string
  }

  struct FlameSpirit {}
  fn (s FlameSpirit) manifest() string { return "A creature of pure plasma appears." }

  struct DataSpirit {}
  fn (s DataSpirit) manifest() string { return "Glitching holographic entities spawn." }

  interface SummoningCircle {
  	summon() Spirit
  }

  struct FlameCircle {}
  fn (c FlameCircle) summon() Spirit { return FlameSpirit{} }

  struct DataCircle {}
  fn (c DataCircle) summon() Spirit { return DataSpirit{} }

  fn cast_ward(circle SummoningCircle) {
  	spirit := circle.summon()
  	println(spirit.manifest())
  }

  fn main() {
  	cast_ward(FlameCircle{})
  	cast_ward(DataCircle{})
  }
tags: [vlang, factory-method, creational, spirits]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Factory Method Sigil

Rather than hard-coding the spirits bound to your defense systems, the Factory Method defers the exact binding process to specialized Summoning Circles. By keeping the interface uniform, you can hot-swap a Flame Circle for a Data Circle, leveraging V's lightning-fast compilation to shift tactics instantly.
