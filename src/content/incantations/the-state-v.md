---
title: "The State Sigil"
description: "Altering a golem's behavior internally depending on its current phase of logic."
type: v
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Phase Shifting"
formula: |2
  module main

  interface GolemState {
  	act() string
  }

  struct IdleState {}
  fn (s IdleState) act() string { return "Golem stands perfectly still." }

  struct CombatState {}
  fn (s CombatState) act() string { return "Golem engages target with extreme prejudice." }

  struct Automaton {
  mut:
  	state GolemState
  }
  fn (mut a Automaton) change_state(new_state GolemState) {
  	a.state = new_state
  }
  fn (a Automaton) perform_action() {
  	println(a.state.act())
  }

  fn main() {
  	mut golem := Automaton{state: IdleState{}}
  	golem.perform_action()

  	println("Threat detected! Shifting state...")
  	golem.change_state(CombatState{})
  	golem.perform_action()
  }
tags: [vlang, state, behavioral, golemancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The State Sigil

Complex conditional statements (`if`/`else` trees) checking an entity's mood result in fragile code. The State pattern treats each phase of existence as a standalone construct that adheres to an interface. In V, updating an object's state is simply reassigning the interface variable to a new concrete struct, seamlessly shifting its reality.
