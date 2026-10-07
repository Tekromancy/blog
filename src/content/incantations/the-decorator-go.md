---
title: The Decorator
description: Attach additional responsibilities to an object dynamically.
type: go
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Enchantment // Augmentation"
formula: |2
  package decorator

  // Component
  type Spell interface {
  	Cast() string
  	ManaCost() int
  }

  // ConcreteComponent
  type BaseMissile struct{}

  func (b *BaseMissile) Cast() string {
  	return "Magic Missile"
  }
  func (b *BaseMissile) ManaCost() int {
  	return 10
  }

  // Decorator (Structural representation, in Go we often just embed or compose directly)
  type EmpoweredSpell struct {
  	Spell Spell
  }

  func (e *EmpoweredSpell) Cast() string {
  	return "Empowered " + e.Spell.Cast()
  }
  func (e *EmpoweredSpell) ManaCost() int {
  	return e.Spell.ManaCost() + 5
  }

  type EchoSpell struct {
  	Spell Spell
  }

  func (e *EchoSpell) Cast() string {
  	return e.Spell.Cast() + " (Echo)"
  }
  func (e *EchoSpell) ManaCost() int {
  	return e.Spell.ManaCost() * 2
  }
tags: [Structural, Enchantment, Go]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Decorator
Rather than drafting entirely new incantations for every permutation of a spell, the Decorator dynamically overlays enchantments onto existing constructs. A standard magic missile can be wrapped in an Empower rune, then an Echo weave, augmenting behavior and mana cost seamlessly without tampering with the base arcane formula.
