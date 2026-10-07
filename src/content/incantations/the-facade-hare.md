---
title: The Facade Hex
description: Provide a unified interface to a set of interfaces in a subsystem.
type: hare
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Transmutation // Veil Weaving"
formula: |2
  use fmt;

  fn init_mana_grid() void = { fmt::println("Mana grid online.")!; };
  fn sync_ley_lines() void = { fmt::println("Ley lines synced.")!; };
  fn bypass_firewall() void = { fmt::println("ICE bypassed.")!; };

  type RitualFacade = struct {
  	execute: *fn() void,
  };

  fn perform_ritual() void = {
  	init_mana_grid();
  	sync_ley_lines();
  	bypass_firewall();
  	fmt::println("Ritual complete.")!;
  };

  export fn main() void = {
  	let facade = RitualFacade { execute = &perform_ritual };
  	facade.execute();
  };
tags: [structural, facade, simple-systems-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
The Facade hides the chaotic, tangled mess of an ancient subsystem behind a clean, simple ritual gesture. It reduces the cognitive load of interfacing with archaic mainframes.
