---
title: The Bridge
description: Decouple an abstraction from its implementation so that the two can vary independently.
type: go
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: Transmutation // Dimensional-binding
formula: |
  package bridge

  // Implementor
  type Enchantment interface {
  	Apply(damage int) string
  }

  // ConcreteImplementor1
  type FireEnchantment struct{}
  func (f *FireEnchantment) Apply(damage int) string {
  	return "burns for extra fire damage"
  }

  // ConcreteImplementor2
  type FrostEnchantment struct{}
  func (f *FrostEnchantment) Apply(damage int) string {
  	return "chills the target, slowing them"
  }

  // Abstraction
  type Weapon interface {
  	Attack() string
  }

  // RefinedAbstraction
  type Sword struct {
  	Damage     int
  	Enchantment Enchantment
  }

  func (s *Sword) Attack() string {
  	effect := s.Enchantment.Apply(s.Damage)
  	return "Sword strikes and " + effect
  }
tags: [Structural, Transmutation, Go]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Bridge
To hardcode an enchantment onto a specific weapon type leads to endless, unmanageable armories. The Bridge pattern slices the structure in two—the physical construct (the abstraction) and the magical overlay (the implementor). Now, a blade can shift its elemental alignment on the fly, keeping the weapon matrix lightweight and deadly.
