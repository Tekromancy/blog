---
title: "The Decorator Sigil"
description: "Dynamically attaching additional protections to a base spell."
type: v
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Abjuration // Layering"
formula: |2
  module main

  interface Spell {
  	execute() string
  }

  struct BaseSpell {}
  fn (s BaseSpell) execute() string {
  	return "Magic Missile"
  }

  struct PoisonDecorator {
  	wrapped Spell
  }
  fn (d PoisonDecorator) execute() string {
  	return d.wrapped.execute() + " coated in Venom"
  }

  struct EchoDecorator {
  	wrapped Spell
  }
  fn (d EchoDecorator) execute() string {
  	return d.wrapped.execute() + " (Echoing thrice)"
  }

  fn main() {
  	mut spell := Spell(BaseSpell{})
  	spell = PoisonDecorator{wrapped: spell}
  	spell = EchoDecorator{wrapped: spell}

  	println(spell.execute())
  }
tags: [vlang, decorator, structural, enhancements]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Decorator Sigil

When a spell needs to be augmented post-compilation, standard inheritance fails. The Decorator pattern dynamically layers behaviors by wrapping the base `Spell` interface. The instant compile ward processes these deeply nested interfaces efficiently, yielding a chained invocation of layered arcane effects.
