---
title: The Strategy
description: Define a family of algorithms, encapsulate each one, and make them interchangeable.
type: go
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: Evocation // Tactical-casting
formula: |
  package strategy

  // Strategy interface
  type CastingStrategy interface {
  	ExecuteSpell(target string) string
  }

  // Concrete Strategy 1
  type StealthCast struct{}
  func (s *StealthCast) ExecuteSpell(target string) string {
  	return "Silently hexing " + target + " from the shadows."
  }

  // Concrete Strategy 2
  type OverchargeCast struct{}
  func (o *OverchargeCast) ExecuteSpell(target string) string {
  	return "Blasting " + target + " with deafening raw power!"
  }

  // Context
  type Mage struct {
  	strategy CastingStrategy
  }
  func (m *Mage) SetStrategy(s CastingStrategy) {
  	m.strategy = s
  }
  func (m *Mage) Attack(target string) string {
  	return m.strategy.ExecuteSpell(target)
  }
tags: [Behavioral, Evocation, Go]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Strategy
Evocation isn't just about throwing fire; it's about knowing *how* to throw it. The Strategy pattern lets a battle-mage swap their methodology at runtime. Approaching a secure facility? Inject the StealthCast strategy. Breached and surrounded? Swap to the OverchargeCast strategy. The core `Attack` method remains clean, while the execution logic is completely modular.
