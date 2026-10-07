---
title: The Factory Method Hex
description: Defer the exact type of conjured entity to the subclasses of the calling matrix.
type: hare
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Deferred Summoning"
formula: |2
  use fmt;

  type Spell = struct {
  	cast: *fn() void,
  };

  fn cast_fireball() void = {
  	fmt::println("A fireball erupts!")!;
  };

  fn cast_ice_shard() void = {
  	fmt::println("Ice shards fly!")!;
  };

  type SpellCreator = struct {
  	create: *fn() Spell,
  };

  fn pyromancer_factory() Spell = {
  	return Spell { cast = &cast_fireball };
  };

  fn cryomancer_factory() Spell = {
  	return Spell { cast = &cast_ice_shard };
  };

  export fn main() void = {
  	let creator = SpellCreator { create = &pyromancer_factory };
  	let spell = creator.create();
  	spell.cast();
  };
tags: [creational, factory-method, simple-systems-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
The Factory Method creates a standardized interface for summoning, allowing the sub-routines to decide exactly which entity to pull from the ether.
