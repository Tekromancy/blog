---
title: The Template Method Hex
description: Define the skeleton of an algorithm, deferring some steps to subclasses.
type: hare
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Evocation // Ritual Skeletons"
formula: |2
  use fmt;

  type Ritual = struct {
  	prepare: *fn() void,
  	cast: *fn() void,
  	cleanup: *fn() void,
  	execute: *fn(r: *Ritual) void,
  };

  fn base_execute(r: *Ritual) void = {
  	r.prepare();
  	r.cast();
  	r.cleanup();
  };

  fn pyromancy_prepare() void = { fmt::println("Gathering heat...")!; };
  fn pyromancy_cast() void = { fmt::println("Unleashing Fireball!")!; };
  fn pyromancy_cleanup() void = { fmt::println("Extinguishing embers.")!; };

  export fn main() void = {
  	let fireball = Ritual {
  		prepare = &pyromancy_prepare,
  		cast = &pyromancy_cast,
  		cleanup = &pyromancy_cleanup,
  		execute = &base_execute,
  	};
  	
  	fireball.execute(&fireball);
  };
tags: [behavioral, template-method, simple-systems-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
A ritual must be followed precisely—prepare, cast, cleanup. The Template Method hex enforces the sequence while allowing the specific magical focus (fire, ice, void) to be slotted in as needed.
