---
title: The State Hex
description: Allow an object to alter its behavior when its internal state changes.
type: hare
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Phase Shifting"
formula: |2
  use fmt;

  type Context = struct {
  	state: *State,
  	request: *fn(c: *Context) void,
  };

  type State = struct {
  	handle: *fn(c: *Context) void,
  };

  fn handle_liquid(c: *Context) void;
  fn handle_solid(c: *Context) void;

  let state_liquid: State = State { handle = &handle_liquid };
  let state_solid: State = State { handle = &handle_solid };

  fn handle_liquid(c: *Context) void = {
  	fmt::println("Water flows... Freezing to solid.")!;
  	c.state = &state_solid;
  };

  fn handle_solid(c: *Context) void = {
  	fmt::println("Ice is rigid... Melting to liquid.")!;
  	c.state = &state_liquid;
  };

  fn context_request(c: *Context) void = {
  	c.state.handle(c);
  };

  export fn main() void = {
  	let ctx = Context { state = &state_liquid, request = &context_request };
  	ctx.request(&ctx);
  	ctx.request(&ctx);
  };
tags: [behavioral, state, simple-systems-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The State hex enables an entity to phase-shift its entire paradigm. It changes its core functional logic on the fly depending on whether it is hot, cold, enraged, or dormant.
