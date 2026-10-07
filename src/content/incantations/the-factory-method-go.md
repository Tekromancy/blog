---
title: The Factory Method
description: Define an interface for creating an object, but let subclasses decide which class to instantiate.
type: go
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: Conjuration // Entity-summoning
formula: |
  package factorymethod

  import "fmt"

  // Product interface
  type Familiar interface {
  	Speak() string
  }

  // ConcreteProduct1
  type CyberRaven struct{}
  func (c *CyberRaven) Speak() string { return "Nevermore... (caw)" }

  // ConcreteProduct2
  type NeonCat struct{}
  func (n *NeonCat) Speak() string { return "Meow (hiss)" }

  // Creator interface
  type FamiliarSummoner interface {
  	Summon() Familiar
  }

  // ConcreteCreator1
  type RavenSummoner struct{}
  func (r *RavenSummoner) Summon() Familiar {
  	return &CyberRaven{}
  }

  // ConcreteCreator2
  type CatSummoner struct{}
  func (c *CatSummoner) Summon() Familiar {
  	return &NeonCat{}
  }
tags: [Creational, Conjuration, Go]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Factory Method
Summoning protocols often require dynamic binding. Instead of hardcoding the manifestation of a familiar, the Factory Method delegates the final instantiation to specialized summoning circles (subclasses). Whether you need a surveillance CyberRaven or a data-mining NeonCat, the abstract protocol remains intact, cleanly decoupling the what from the how.
