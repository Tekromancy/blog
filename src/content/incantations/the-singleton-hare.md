---
title: The Singleton Hex
description: Ensure only one instance of an arcane artifact exists across the entire realm.
type: hare
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Conjuration // Monolithic Bindings"
formula: |2
  use fmt;

  type CoreCrystal = struct {
  	power_level: uint,
  };

  let instance: CoreCrystal = CoreCrystal { power_level = 9000 };

  fn get_crystal() *CoreCrystal = {
  	return &instance;
  };

  export fn main() void = {
  	let crystal1 = get_crystal();
  	let crystal2 = get_crystal();
  	crystal1.power_level = 9001;
  	fmt::printfln("Crystal 2 power: {}", crystal2.power_level)!;
  };
tags: [creational, singleton, simple-systems-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
The Singleton binds a unique entity into global memory, ensuring that no matter how many threads or scripts reach for it, they all touch the exact same metaphysical anchor.
