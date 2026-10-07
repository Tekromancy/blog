---
title: "The Abstract Factory Sigil"
description: "A structural ward that weaves blazing sigils to forge families of related arcane constructs."
type: v
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Sigilmancy"
formula: |2
  module main

  // Abstract Products
  interface Ward {
  	activate() string
  }

  interface Sigil {
  	glow() string
  }

  // Concrete Products: Fire
  struct FireWard {}
  fn (w FireWard) activate() string { return "Flames erupt from the ward." }

  struct FireSigil {}
  fn (s FireSigil) glow() string { return "The sigil burns with crimson light." }

  // Concrete Products: Frost
  struct FrostWard {}
  fn (w FrostWard) activate() string { return "Ice crystals form around the ward." }

  struct FrostSigil {}
  fn (s FrostSigil) glow() string { return "The sigil emanates a freezing pale light." }

  // Abstract Factory
  interface ElementalForge {
  	create_ward() Ward
  	create_sigil() Sigil
  }

  // Concrete Factories
  struct FireForge {}
  fn (f FireForge) create_ward() Ward { return FireWard{} }
  fn (f FireForge) create_sigil() Sigil { return FireSigil{} }

  struct FrostForge {}
  fn (f FrostForge) create_ward() Ward { return FrostWard{} }
  fn (f FrostForge) create_sigil() Sigil { return FrostSigil{} }

  fn main() {
  	mut forge := ElementalForge(FireForge{})
  	println(forge.create_ward().activate())
  	println(forge.create_sigil().glow())

  	forge = FrostForge{}
  	println(forge.create_ward().activate())
  	println(forge.create_sigil().glow())
  }
tags: [vlang, abstract-factory, creational, blazing-sigils]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Abstract Factory Sigil

In the neon-lit alleys of neo-Babylon, magi require consistent structural wards. The Abstract Factory ensures that when you invoke a family of elemental protections, they never cross-contaminate. Fire sigils belong with fire wards, lest the instant compile ward collapses into explosive magical dissonance.
