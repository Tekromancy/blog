---
title: The State
description: Allow an object to alter its behavior when its internal state changes. The object will appear to change its class.
type: go
gofPattern: State
gofCategory: Behavioral
arcaneSchool: Transmutation // Form-shifting
formula: |
  package state

  import "fmt"

  // State interface
  type LycanthropeState interface {
  	Attack() string
  	TakeDamage() string
  }

  // Context
  type Werewolf struct {
  	currentState LycanthropeState
  }
  func (w *Werewolf) SetState(s LycanthropeState) {
  	w.currentState = s
  }
  func (w *Werewolf) Attack() string {
  	return w.currentState.Attack()
  }

  // Concrete State 1
  type HumanForm struct{}
  func (h *HumanForm) Attack() string { return "Swings a silver sword." }
  func (h *HumanForm) TakeDamage() string { return "Bleeds red blood." }

  // Concrete State 2
  type BeastForm struct{}
  func (b *BeastForm) Attack() string { return "Slashes with massive claws!" }
  func (b *BeastForm) TakeDamage() string { return "Shrugs off mortal wounds!" }
tags: [Behavioral, Transmutation, Go]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The State
A shapeshifter's logic is fundamentally tied to the moon's pull. Trying to manage behavior with massive `if-else` blocks based on lunar cycles is sloppy magic. The State pattern encapsulates form-specific behavior—Human or Beast—into distinct states. When the transformation triggers, the context swaps its internal state object, seamlessly altering its methods without changing its core identity.
