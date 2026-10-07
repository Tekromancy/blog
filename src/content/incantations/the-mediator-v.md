---
title: "The Mediator Sigil"
description: "Centralizing complex chaotic communications between independent elemental nodes."
type: v
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Abjuration // Coordination"
formula: |2
  module main

  interface GridMediator {
  	notify(sender string, event string)
  }

  @[heap]
  struct ControlTower {
  mut:
  	alpha_node &Node = unsafe { nil }
  	beta_node  &Node = unsafe { nil }
  }
  fn (mut t ControlTower) notify(sender string, event string) {
  	if sender == "Alpha" && event == "Overload" {
  		println("Tower: Alpha is overloading. Triggering Beta cooling.")
  		t.beta_node.cool_down()
  	}
  }

  @[heap]
  struct Node {
  	name     string
  mut:
  	mediator GridMediator
  }
  fn (mut n Node) trigger_overload() {
  	println("\$n.name: Experiencing overload!")
  	n.mediator.notify(n.name, "Overload")
  }
  fn (n Node) cool_down() {
  	println("\$n.name: Cooling down systems.")
  }

  fn main() {
  	mut tower := &ControlTower{}

  	mut alpha := &Node{name: "Alpha", mediator: tower}
  	mut beta := &Node{name: "Beta", mediator: tower}

  	tower.alpha_node = alpha
  	tower.beta_node = beta

  	alpha.trigger_overload()
  }
tags: [vlang, mediator, behavioral, control]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Mediator Sigil

When dozens of nodes form a localized grid, having them interact directly results in a tangled spaghetti web of dependencies. The Mediator sigil serves as the Control Tower. Nodes report anomalies solely to the Mediator, which houses the macro-logic for routing power and cooling directives.
