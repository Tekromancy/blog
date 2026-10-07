---
title: "The State Incantation in Carbon"
description: "Allow an entity to alter its behavior entirely when its internal state shifts."
type: carbon
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Polymorphism"
formula: |2
  package StatePattern api;

  class MechContext;

  interface MechState {
    fn HandleDamage[me: Self](ctx: MechContext*);
  }

  class NormalState {
    impl as MechState {
      fn HandleDamage[me: Self](ctx: MechContext*) {
        // Handle hit, maybe transition ctx to CriticalState
      }
    }
  }

  class CriticalState {
    impl as MechState {
      fn HandleDamage[me: Self](ctx: MechContext*) {
        // Eject pilot, self destruct
      }
    }
  }

  class MechContext {
    var state: MechState*;

    fn TakeHit[me: Self]() {
      (*me.state).HandleDamage(&me);
    }
    
    fn SetState[addr me: Self*>(s: MechState*) {
      (*me).state = s;
    }
  }
tags: [behavioral, carbon, state machine]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The State: Morphic Resonance

When a cyber-mech takes damage, its behavior must fundamentally change. Instead of cluttering the `MechContext` with massive `switch` statements and boolean flags, the State pattern encapsulates state-specific behavior into separate classes.

Carbon handles this elegantly. The `MechContext` holds a pointer to the `MechState` interface. When `TakeHit` is called, it delegates to the current state. The `NormalState` might absorb the blow, while the `CriticalState` initiates an ejection sequence. This object-oriented finite state machine is highly predictable and deeply favored by the Successor Pact.
