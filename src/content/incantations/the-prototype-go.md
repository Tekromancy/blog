---
title: The Prototype
description: Specify the kinds of objects to create using a prototypical instance, and create new objects by copying this prototype.
type: go
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: Illusion // Cloning
formula: |
  package prototype

  // Prototype interface
  type Cloneable interface {
  	Clone() Cloneable
  }

  // ConcretePrototype
  type ShadowDouble struct {
  	Health int
  	Weapon string
  }

  func (s *ShadowDouble) Clone() Cloneable {
  	// Perform a deep copy (or shallow, if adequate for the spell)
  	return &ShadowDouble{
  		Health: s.Health,
  		Weapon: s.Weapon,
  	}
  }
tags: [Creational, Illusion, Go]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Prototype
Why invoke the costly ether when you can copy what already exists? The Prototype pattern allows a master of illusions to cast a Shadow Double by simply duplicating a pre-compiled template. This spell drastically reduces mana expenditure in high-frequency clone spawning, copying the exact state memory to the newly formed simulacrum.
