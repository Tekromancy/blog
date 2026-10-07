---
title: The Builder
description: Separate the construction of a complex object from its representation.
type: go
gofPattern: Builder
gofCategory: Creational
arcaneSchool: Transmutation // Construct-shaping
formula: |
  package builder

  // Builder interface
  type GolemBuilder interface {
  	SetCore(core string)
  	SetArmor(armor string)
  	SetWeapon(weapon string)
  	GetGolem() Golem
  }

  // Product
  type Golem struct {
  	Core   string
  	Armor  string
  	Weapon string
  }

  // ConcreteBuilder
  type ObsidianGolemBuilder struct {
  	golem Golem
  }

  func (b *ObsidianGolemBuilder) SetCore(core string) { b.golem.Core = core }
  func (b *ObsidianGolemBuilder) SetArmor(armor string) { b.golem.Armor = armor }
  func (b *ObsidianGolemBuilder) SetWeapon(weapon string) { b.golem.Weapon = weapon }
  func (b *ObsidianGolemBuilder) GetGolem() Golem { return b.golem }

  // Director
  type Artificer struct {
  	builder GolemBuilder
  }

  func (a *Artificer) ConstructObsidianGolem() {
  	a.builder.SetCore("Magma Core")
  	a.builder.SetArmor("Obsidian Plating")
  	a.builder.SetWeapon("Volcanic Hammer")
  }
tags: [Creational, Transmutation, Go]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Builder
In the glowing hum of the construct vats, an artificer doesn't just will a complex entity into being. The process is layered. Step by step, the Builder pattern lays down the neural lace, attaches the runic armor, and aligns the power cores. It separates the intricate ritual of assembly from the raw data structure it instantiates.
