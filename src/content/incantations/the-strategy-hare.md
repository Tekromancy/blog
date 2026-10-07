---
title: The Strategy Hex
description: Define a family of algorithms, encapsulate each one, and make them interchangeable.
type: hare
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Tactical Weaving"
formula: |2
  use fmt;

  type Strategy = struct {
  	execute: *fn(a: int, b: int) int,
  };

  fn strat_add(a: int, b: int) int = {
  	return a + b;
  };

  fn strat_multiply(a: int, b: int) int = {
  	return a * b;
  };

  type Context = struct {
  	strategy: *Strategy,
  	execute_strategy: *fn(c: *Context, a: int, b: int) int,
  };

  fn context_execute(c: *Context, a: int, b: int) int = {
  	return c.strategy.execute(a, b);
  };

  export fn main() void = {
  	let add_s = Strategy { execute = &strat_add };
  	let mult_s = Strategy { execute = &strat_multiply };
  	
  	let ctx = Context { strategy = &add_s, execute_strategy = &context_execute };
  	fmt::printfln("Addition result: {}", ctx.execute_strategy(&ctx, 3, 4))!;
  	
  	ctx.strategy = &mult_s;
  	fmt::printfln("Multiplication result: {}", ctx.execute_strategy(&ctx, 3, 4))!;
  };
tags: [behavioral, strategy, simple-systems-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Why hardcode a battle plan when the warzone is ever-shifting? The Strategy hex lets you hot-swap the internal algorithms of a construct without disrupting its outer shell.
