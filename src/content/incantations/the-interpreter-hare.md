---
title: The Interpreter Hex
description: Given a language, define a representation for its grammar and an interpreter.
type: hare
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Rune Translation"
formula: |2
  use fmt;

  type Expression = struct {
  	interpret: *fn(e: *Expression, context: str) bool,
  	data: str,
  };

  fn interpret_terminal(e: *Expression, context: str) bool = {
  	// In standard Hare, we would use strings::contains, but we'll mock it for simplicity.
  	if (context == e.data) {
  		return true;
  	};
  	return false;
  };

  export fn main() void = {
  	let is_fire = Expression { interpret = &interpret_terminal, data = "ignis" };
  	
  	let context1 = "ignis";
  	let context2 = "aqua";
  	
  	fmt::printfln("Context 1 matches fire: {}", is_fire.interpret(&is_fire, context1))!;
  	fmt::printfln("Context 2 matches fire: {}", is_fire.interpret(&is_fire, context2))!;
  };
tags: [behavioral, interpreter, simple-systems-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---
When parsing ancient grimoires or alien signal dialects, the Interpreter builds an abstract syntax tree of understanding, unraveling the meaning of the arcane expressions.
