---
title: The Builder Hex
description: Construct complex arcane data structures step by step.
type: hare
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Conjuration // Construct Assembly"
formula: |2
  use fmt;

  type Golem = struct {
  	head: str,
  	body: str,
  	arms: str,
  };

  type GolemBuilder = struct {
  	golem: Golem,
  };

  fn new_builder() GolemBuilder = {
  	return GolemBuilder { golem = Golem { head = "", body = "", arms = "" } };
  };

  fn build_head(b: *GolemBuilder, head: str) void = {
  	b.golem.head = head;
  };

  fn build_body(b: *GolemBuilder, body: str) void = {
  	b.golem.body = body;
  };

  fn get_golem(b: *GolemBuilder) Golem = {
  	return b.golem;
  };

  export fn main() void = {
  	let b = new_builder();
  	build_head(&b, "Titanium Cranium");
  	build_body(&b, "Carbon Fiber Chassis");
  	let g = get_golem(&b);
  	fmt::printfln("Constructed: {} with {}", g.head, g.body)!;
  };
tags: [creational, builder, simple-systems-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
When the sigils required for instantiation grow too numerous, the Builder separates the construction of a complex object from its representation, ensuring safety in your summoning routines.
