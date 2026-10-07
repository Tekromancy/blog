---
title: "The Memento Sigil"
description: "Capturing a temporal snapshot of a matrix to restore its state later."
type: v
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // State Preservation"
formula: |2
  module main

  // Memento
  struct MatrixSnapshot {
  	energy int
  	runes  string
  }

  // Originator
  struct SpellMatrix {
  mut:
  	energy int
  	runes  string
  }
  fn (mut m SpellMatrix) save() MatrixSnapshot {
  	return MatrixSnapshot{energy: m.energy, runes: m.runes}
  }
  fn (mut m SpellMatrix) restore(snap MatrixSnapshot) {
  	m.energy = snap.energy
  	m.runes = snap.runes
  }
  fn (m SpellMatrix) display() {
  	println("Matrix State -> Energy: \$m.energy, Runes: \$m.runes")
  }

  // Caretaker
  struct ChronoVault {
  mut:
  	history []MatrixSnapshot
  }

  fn main() {
  	mut matrix := SpellMatrix{energy: 100, runes: "Alpha"}
  	mut vault := ChronoVault{}

  	matrix.display()
  	vault.history << matrix.save()

  	matrix.energy = 20
  	matrix.runes = "Alpha Omega"
  	matrix.display()

  	println("Initiating temporal rollback...")
  	matrix.restore(vault.history.pop())
  	matrix.display()
  }
tags: [vlang, memento, behavioral, chronomancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Memento Sigil

True Chronomancy does not manipulate time; it simply stores the immutable footprint of reality at a specific coordinate and overwrites the present. The Memento allows you to save the exact configuration of a complex ward without exposing its internal fields. Vlang makes copying values safe and fast, preventing state contamination.
