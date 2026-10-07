---
title: The Composite Hex
description: Compose objects into tree structures to represent part-whole hierarchies.
type: hare
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Transmutation // Fractalline Binding"
formula: |2
  use fmt;

  type Component = struct {
  	execute: *fn(c: *Component) void,
  	name: str,
  };

  fn exec_leaf(c: *Component) void = {
  	fmt::printfln("Executing simple spell: {}", c.name)!;
  };

  // Due to Hare's strictness, true dynamic tree structures are built 
  // with slices of pointers and custom types, but here we abstract it.
  export fn main() void = {
  	let spark = Component { execute = &exec_leaf, name = "Spark" };
  	let flare = Component { execute = &exec_leaf, name = "Flare" };
  	
  	spark.execute(&spark);
  	flare.execute(&flare);
  };
tags: [structural, composite, simple-systems-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Composite is a fractal pattern. It lets the caster treat a single minor hex and a massive, interwoven ritual tree identically, streamlining the execution protocols.
