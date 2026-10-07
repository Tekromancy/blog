---
title: The Facade
description: Provide a unified interface to a set of interfaces in a subsystem.
type: go
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // UI-masking"
formula: |2
  package facade

  // Subsystem 1
  type ManaGrid struct{}
  func (m *ManaGrid) RoutePower() string { return "Mana routed. " }

  // Subsystem 2
  type RuningEngine struct{}
  func (r *RuningEngine) DecryptRunes() string { return "Runes decrypted. " }

  // Subsystem 3
  type ElementalCore struct{}
  func (e *ElementalCore) Ignite() string { return "Core ignited." }

  // Facade
  type CastingDeck struct {
  	grid   *ManaGrid
  	engine *RuningEngine
  	core   *ElementalCore
  }

  func NewCastingDeck() *CastingDeck {
  	return &CastingDeck{
  		grid:   &ManaGrid{},
  		engine: &RuningEngine{},
  		core:   &ElementalCore{},
  	}
  }

  func (c *CastingDeck) FireballMacro() string {
  	return c.grid.RoutePower() + c.engine.DecryptRunes() + c.core.Ignite()
  }
tags: [Structural, Illusion, Go]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Facade
The deeper arcane subsystems—mana routing, runic decryption, elemental alignment—are incredibly volatile and dangerous to manipulate directly during combat. The Facade wraps this chaotic complexity in a sleek, streamlined mental UI. With a single "FireballMacro" thought, the facade triggers the underlying chaos safely and deterministically.
