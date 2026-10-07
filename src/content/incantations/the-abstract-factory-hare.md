---
title: The Abstract Factory Hex
description: Forge families of related artifacts in the deep systems layer.
type: hare
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Systems Conjuration"
formula: |2
  use fmt;

  type Widget = struct {
  	render: *fn() void,
  };

  fn render_neon() void = {
  	fmt::println("Neon Widget Glowing")!;
  };

  fn render_void() void = {
  	fmt::println("Void Widget Absorbing Light")!;
  };

  type Factory = struct {
  	create_widget: *fn() Widget,
  };

  fn neon_factory() Widget = {
  	return Widget { render = &render_neon };
  };

  fn void_factory() Widget = {
  	return Widget { render = &render_void };
  };

  export fn main() void = {
  	let f = Factory { create_widget = &neon_factory };
  	let w = f.create_widget();
  	w.render();
  };
tags: [creational, abstract-factory, simple-systems-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Abstract Factory pattern allows a system magus to switch out the entire thematic output of a summoning matrix without rewriting the core control flow. In the Hare systems language, this is often done with structs containing function pointers, acting as virtual tables for your hexes.
