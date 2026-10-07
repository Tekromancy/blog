---
title: The Decorator Hex
description: Attach additional responsibilities to an object dynamically.
type: hare
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Transmutation // Spell Layering"
formula: |2
  use fmt;

  type Spell = struct {
  	cast: *fn(s: *Spell) void,
  	base_cost: uint,
  };

  fn cast_base(s: *Spell) void = {
  	fmt::printfln("Casting base spell. Cost: {}", s.base_cost)!;
  };

  type EmpoweredSpell = struct {
  	inner: *Spell,
  	cast: *fn(es: *EmpoweredSpell) void,
  };

  fn cast_empowered(es: *EmpoweredSpell) void = {
  	es.inner.cast(es.inner);
  	fmt::println("Adding EMP shockwave!")!;
  };

  export fn main() void = {
  	let base = Spell { cast = &cast_base, base_cost = 10 };
  	let emp = EmpoweredSpell { inner = &base, cast = &cast_empowered };
  	emp.cast(&emp);
  };
tags: [structural, decorator, simple-systems-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
By layering enhancements over an existing construct, the Decorator hex prevents an explosion of sub-classes. You can wrap a mundane fireball in EMP-bursts and tracking-runes dynamically at runtime.
