---
title: The Iterator Hex
description: Access the elements of an aggregate object sequentially without exposing its underlying representation.
type: hare
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Sequential Scrying"
formula: |2
  use fmt;

  type RuneCollection = struct {
  	runes: [3]str,
  };

  type RuneIterator = struct {
  	collection: *RuneCollection,
  	index: size,
  	has_next: *fn(it: *RuneIterator) bool,
  	next: *fn(it: *RuneIterator) str,
  };

  fn has_next(it: *RuneIterator) bool = {
  	return it.index < len(it.collection.runes);
  };

  fn next(it: *RuneIterator) str = {
  	let rune = it.collection.runes[it.index];
  	it.index += 1;
  	return rune;
  };

  export fn main() void = {
  	let collection = RuneCollection { runes = ["Alpha", "Beta", "Gamma"] };
  	let it = RuneIterator { collection = &collection, index = 0, has_next = &has_next, next = &next };
  	
  	for (it.has_next(&it)) {
  		fmt::printfln("Scrying rune: {}", it.next(&it))!;
  	};
  };
tags: [behavioral, iterator, simple-systems-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
To walk the lay lines of a vast data structure without knowing its true topological form, the Iterator hex provides a steady, stepwise scrying lens.
