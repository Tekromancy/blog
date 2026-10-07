---
title: The Flyweight Hex
description: Use sharing to support large numbers of fine-grained objects efficiently.
type: hare
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Memory Compression"
formula: |2
  use fmt;

  type RuneModel = struct {
  	mesh: str,
  	texture: str,
  };

  let fire_rune_model: RuneModel = RuneModel { mesh = "fire_mesh_v1", texture = "red_glow" };

  type ProjectedRune = struct {
  	x: int,
  	y: int,
  	model: *RuneModel,
  };

  export fn main() void = {
  	let r1 = ProjectedRune { x = 10, y = 20, model = &fire_rune_model };
  	let r2 = ProjectedRune { x = 15, y = 25, model = &fire_rune_model };
  	
  	fmt::printfln("Rune 1 uses texture: {}", r1.model.texture)!;
  	fmt::printfln("Rune 2 uses texture: {}", r2.model.texture)!;
  };
tags: [structural, flyweight, simple-systems-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
When manifesting thousands of glowing runes in the physical plane, the memory costs can shatter your mind. The Flyweight shares the heavy immutable intrinsic state among countless instances.
