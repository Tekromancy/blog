---
title: "The Observer Sigil"
description: "Establishing a psychic broadcast network to notify multiple wards of a grid shift."
type: v
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Broadcasting"
formula: |2
  module main

  interface Observer {
  	update(event string)
  }

  struct GridMonitor {
  mut:
  	observers []Observer
  }
  fn (mut g GridMonitor) attach(o Observer) {
  	g.observers << o
  }
  fn (g GridMonitor) broadcast(event string) {
  	for o in g.observers {
  		o.update(event)
  	}
  }

  struct SecurityWard {
  	id int
  }
  fn (w SecurityWard) update(event string) {
  	println("Ward \$w.id received telemetry: \$event. Adapting defenses.")
  }

  fn main() {
  	mut monitor := GridMonitor{}
  	w1 := SecurityWard{id: 1}
  	w2 := SecurityWard{id: 2}

  	monitor.attach(w1)
  	monitor.attach(w2)

  	monitor.broadcast("DEMONIC_INCURSION_DETECTED")
  }
tags: [vlang, observer, behavioral, psychic-network]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
# The Observer Sigil

Instead of having your defensive wards constantly ping the network to see if danger approaches, the Observer flips the flow. Wards register to the GridMonitor, which blasts a psychic `broadcast` when reality starts warping. V's arrays of interfaces elegantly handle holding diverse, decoupled listeners.
