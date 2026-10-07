---
title: The Mediator
description: Define an object that encapsulates how a set of objects interact.
type: go
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: Enchantment // Mind-linking
formula: |
  package mediator

  import "fmt"

  // Mediator interface
  type Coven interface {
  	Communicate(sender Witch, message string)
  }

  // Colleague interface
  type Witch interface {
  	Send(message string)
  	Receive(message string)
  }

  // Concrete Mediator
  type CircleOfShadows struct {
  	witches []Witch
  }
  func (c *CircleOfShadows) Register(w Witch) {
  	c.witches = append(c.witches, w)
  }
  func (c *CircleOfShadows) Communicate(sender Witch, message string) {
  	for _, w := range c.witches {
  		if w != sender {
  			w.Receive(message)
  		}
  	}
  }

  // Concrete Colleague
  type BloodWitch struct {
  	Name  string
  	coven Coven
  }
  func (b *BloodWitch) Send(message string) {
  	fmt.Printf("%s sends: %s\n", b.Name, message)
  	b.coven.Communicate(b, message)
  }
  func (b *BloodWitch) Receive(message string) {
  	fmt.Printf("%s received: %s\n", b.Name, message)
  }
tags: [Behavioral, Enchantment, Go]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Mediator
A coven scattered across the sprawl cannot rely on point-to-point psychic whispers; the interference is too high. The Mediator acts as the central astral hub. Each witch connects only to the Coven entity. When a curse is broadcast, the Mediator routes the arcane resonance to all other registered colleagues, untangling the chaotic web of direct mental links.
