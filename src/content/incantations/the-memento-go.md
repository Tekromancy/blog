---
title: The Memento
description: Without violating encapsulation, capture and externalize an object's internal state so that the object can be restored to this state later.
type: go
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: Necromancy // Soul-anchoring
formula: |
  package memento

  import "fmt"

  // Memento
  type SoulAnchor struct {
  	health int
  	mana   int
  }

  // Originator
  type Lich struct {
  	Health int
  	Mana   int
  }
  func (l *Lich) CreateAnchor() *SoulAnchor {
  	return &SoulAnchor{health: l.Health, mana: l.Mana}
  }
  func (l *Lich) Restore(anchor *SoulAnchor) {
  	l.Health = anchor.health
  	l.Mana = anchor.mana
  }

  // Caretaker
  type Phylactery struct {
  	anchors []*SoulAnchor
  }
  func (p *Phylactery) Save(anchor *SoulAnchor) {
  	p.anchors = append(p.anchors, anchor)
  }
  func (p *Phylactery) Undo(lich *Lich) {
  	if len(p.anchors) == 0 { return }
  	last := p.anchors[len(p.anchors)-1]
  	p.anchors = p.anchors[:len(p.anchors)-1]
  	lich.Restore(last)
  }
tags: [Behavioral, Necromancy, Go]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Memento
Immortality is just a matter of state management. A Lich does not simply regenerate; they revert to a previously saved Soul Anchor stored securely in their Phylactery. The Memento pattern captures the Lich's exact HP and Mana without exposing the delicate dark-matter variables to the outside world, allowing for a perfect rollback when their physical shell is compromised.
