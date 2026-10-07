---
title: The Command Hex
description: Encapsulate a request as an object, thereby parameterizing clients with different requests.
type: hare
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Evocation // Delayed Activation"
formula: |2
  use fmt;

  type Command = struct {
  	execute: *fn() void,
  };

  fn strike_lightning() void = {
  	fmt::println("Lightning strikes from the cyber-cloud!")!;
  };

  fn open_portal() void = {
  	fmt::println("A neon portal rips open!")!;
  };

  export fn main() void = {
  	let c1 = Command { execute = &strike_lightning };
  	let c2 = Command { execute = &open_portal };
  	
  	// Store them in an array (queue) to cast later
  	let queue = [c1, c2];
  	for (let i = 0z; i < len(queue); i += 1) {
  		queue[i].execute();
  	};
  };
tags: [behavioral, command, simple-systems-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
A spell scroll is merely a Command waiting to be invoked. By encapsulating an action into a discrete rune structure, you can queue, delay, or undo your conjurations at will.
