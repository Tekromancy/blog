---
title: The Prototype Hex
description: Clone existing entities without binding your spells to their exact classes.
type: hare
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Conjuration // Replication"
formula: |2
  use fmt;

  type Familiar = struct {
  	name: str,
  	energy: uint,
  };

  fn clone_familiar(f: *Familiar) Familiar = {
  	return Familiar {
  		name = f.name,
  		energy = f.energy,
  	};
  };

  export fn main() void = {
  	let original = Familiar { name = "Byte", energy = 100 };
  	let copy = clone_familiar(&original);
  	fmt::printfln("Cloned {} with {} energy.", copy.name, copy.energy)!;
  };
tags: [creational, prototype, simple-systems-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Why conjure anew when you can duplicate? The Prototype hex simply copies the raw memory layout of a known working construct, skipping the expensive initialization rituals.
