---
title: The Composite
description: Compose objects into tree structures to represent part-whole hierarchies.
type: go
gofPattern: Composite
gofCategory: Structural
arcaneSchool: Conjuration // Swarm-shaping
formula: |
  package composite

  import "fmt"

  // Component
  type MilitaryUnit interface {
  	ExecuteCommand()
  }

  // Leaf
  type Skeleton struct {
  	Name string
  }

  func (s *Skeleton) ExecuteCommand() {
  	fmt.Println(s.Name + " strikes with rusty sword!")
  }

  // Composite
  type NecromancerPlatoon struct {
  	Units []MilitaryUnit
  }

  func (n *NecromancerPlatoon) Add(unit MilitaryUnit) {
  	n.Units = append(n.Units, unit)
  }

  func (n *NecromancerPlatoon) ExecuteCommand() {
  	fmt.Println("Platoon executing commands...")
  	for _, unit := range n.Units {
  		unit.ExecuteCommand()
  	}
  }
tags: [Structural, Conjuration, Go]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Composite
A true necromancer commands armies, not just individuals. The Composite pattern treats a vast, hierarchical swarm of thralls identical to a single undead minion. Send a command to the platoon node, and the psychic link cascades downward, activating every skeleton, lich, and ghoul in perfect, terrible synchronization.
