---
title: "The Facade Sigil"
description: "A simplified sigil that hides the chaotic complexity of the raw elemental planes."
type: v
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // Masking"
formula: |2
  module main

  struct ManaGrid {
  	draw() { println("Drawing mana...") }
  }

  struct SpatialAnchor {
  	lock() { println("Locking coordinates...") }
  }

  struct MatterSynthesizer {
  	create() { println("Synthesizing object...") }
  }

  // Facade
  struct TeleportationRune {
  	grid   ManaGrid
  	anchor SpatialAnchor
  	synth  MatterSynthesizer
  }

  fn (r TeleportationRune) teleport() {
  	r.grid.draw()
  	r.anchor.lock()
  	r.synth.create()
  	println("Teleportation complete.")
  }

  fn main() {
  	rune := TeleportationRune{
  		grid: ManaGrid{}
  		anchor: SpatialAnchor{}
  		synth: MatterSynthesizer{}
  	}
  	rune.teleport()
  }
tags: [vlang, facade, structural, simplification]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Facade Sigil

A proper magus does not manually balance the mana grid, lock spatial anchors, and synthesize matter every time they jump across the city. The Facade provides a single, high-level `teleport()` invocation, hiding the grueling low-level subsystems behind a clean, unified Vlang interface.
