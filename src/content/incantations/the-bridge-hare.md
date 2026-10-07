---
title: The Bridge Hex
description: Decouple an abstraction from its implementation so both can vary independently.
type: hare
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Dimensional Splitting"
formula: |2
  use fmt;

  type Renderer = struct {
  	render_shape: *fn(name: str) void,
  };

  fn render_holo(name: str) void = {
  	fmt::printfln("Holographic projection of {}", name)!;
  };

  fn render_shadow(name: str) void = {
  	fmt::printfln("Shadow weaving of {}", name)!;
  };

  type Shape = struct {
  	name: str,
  	renderer: Renderer,
  };

  fn draw_shape(s: *Shape) void = {
  	s.renderer.render_shape(s.name);
  };

  export fn main() void = {
  	let holo = Renderer { render_shape = &render_holo };
  	let shadow = Renderer { render_shape = &render_shadow };

  	let cube = Shape { name = "Cube", renderer = holo };
  	draw_shape(&cube);

  	cube.renderer = shadow;
  	draw_shape(&cube);
  };
tags: [structural, bridge, simple-systems-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Bridge severs the hard link between an entity's form and its materialization. In the cyber-arcane realms, a spell's logic exists apart from whether it manifests as a hardlight hologram or a shadow-weave.
