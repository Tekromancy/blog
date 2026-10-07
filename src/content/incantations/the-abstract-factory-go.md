---
title: The Abstract Factory
description: Conjure families of related or dependent objects without specifying their concrete classes.
type: go
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Matter-weaving"
formula: |2
  package abstractfactory

  import "fmt"

  // AbstractFactory represents the interface for creating arcane weapons.
  type ArcaneForge interface {
  	CreateStaff() Staff
  	CreateRobe() Robe
  }

  // AbstractProductA
  type Staff interface {
  	Cast() string
  }

  // AbstractProductB
  type Robe interface {
  	Defend() string
  }

  // ConcreteFactory1
  type PyromancyForge struct{}

  func (f *PyromancyForge) CreateStaff() Staff { return &FlameStaff{} }
  func (f *PyromancyForge) CreateRobe() Robe   { return &AshRobe{} }

  // ConcreteFactory2
  type CryomancyForge struct{}

  func (f *CryomancyForge) CreateStaff() Staff { return &FrostStaff{} }
  func (f *CryomancyForge) CreateRobe() Robe   { return &GlacialRobe{} }

  // ConcreteProductA1
  type FlameStaff struct{}
  func (s *FlameStaff) Cast() string { return "Casting Fireball!" }

  // ConcreteProductA2
  type FrostStaff struct{}
  func (s *FrostStaff) Cast() string { return "Casting Ice Shard!" }

  // ConcreteProductB1
  type AshRobe struct{}
  func (r *AshRobe) Defend() string { return "Resisting Fire Damage!" }

  // ConcreteProductB2
  type GlacialRobe struct{}
  func (r *GlacialRobe) Defend() string { return "Resisting Cold Damage!" }
tags: [Creational, Conjuration, Go]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Abstract Factory
The Abstract Factory pattern allows a technomancer to bind related constructs into a cohesive suite. In the grimy depths of the cyber-sprawl, a mage must swap complete loadouts—swapping their Pyromancy rig for Cryomancy gear in a single neural impulse. This forge ensures all crafted components resonate on the same arcane frequency.
