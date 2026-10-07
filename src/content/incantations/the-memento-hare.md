---
title: The Memento Hex
description: Capture and externalize an object's internal state so it can be restored later.
type: hare
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Divination // Temporal Anchor"
formula: |2
  use fmt;

  type Memento = struct {
  	state: str,
  };

  type Originator = struct {
  	state: str,
  };

  fn save_state(o: *Originator) Memento = {
  	return Memento { state = o.state };
  };

  fn restore_state(o: *Originator, m: Memento) void = {
  	o.state = m.state;
  };

  export fn main() void = {
  	let o = Originator { state = "Healthy" };
  	fmt::printfln("Initial state: {}", o.state)!;
  	
  	let mem = save_state(&o);
  	o.state = "Corrupted";
  	fmt::printfln("Current state: {}", o.state)!;
  	
  	restore_state(&o, mem);
  	fmt::printfln("Restored state: {}", o.state)!;
  };
tags: [behavioral, memento, simple-systems-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Memento hex is a temporal save-point. By crystalizing the state of a system into a dormant artifact, a magus can roll back the ravages of corruption or a failed spellcasting attempt.
