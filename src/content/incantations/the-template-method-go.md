---
title: The Template Method
description: Define the skeleton of an algorithm in an operation, deferring some steps to subclasses.
type: go
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: Alchemy // Ritual-structuring
formula: |
  package templatemethod

  import "fmt"

  // Since Go doesn't have inheritance, we use composition/interfaces.
  type RitualSteps interface {
  	GatherIngredients()
  	Chant()
  }

  // Template Method structure
  type Ritual struct {
  	steps RitualSteps
  }
  func (r *Ritual) PerformRitual() {
  	fmt.Println("Drawing the summoning circle.")
  	r.steps.GatherIngredients()
  	r.steps.Chant()
  	fmt.Println("Closing the dimensional rift.")
  }

  // Concrete Implementation
  type DemonSummoning struct{}
  func (d *DemonSummoning) GatherIngredients() {
  	fmt.Println("Gathering brimstone and cursed blood.")
  }
  func (d *DemonSummoning) Chant() {
  	fmt.Println("Chanting in abyssal tongues.")
  }
tags: [Behavioral, Alchemy, Go]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Template Method
Arcane rituals are dangerous precisely because missing a step can result in being devoured. The Template Method sets the rigid scaffolding of the spell: draw circle, gather, chant, close rift. A high-alchemist enforces this structure, only deferring the specific ingredients and chants to the concrete sub-rituals. The safety parameters remain firmly in the base execution block.
