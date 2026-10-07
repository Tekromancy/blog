---
title: The Adapter Hex
description: Allow incompatible magical interfaces to communicate.
type: hare
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Interface Shifting"
formula: |2
  use fmt;

  type OldScroll = struct {
  	read_ancient_text: *fn() str,
  };

  fn read_ancient() str = {
  	return "Thy arcane legacy...";
  };

  type NewDatapad = struct {
  	scroll: OldScroll,
  	read_digital: *fn(s: *NewDatapad) str,
  };

  fn read_digital_adapter(d: *NewDatapad) str = {
  	return d.scroll.read_ancient_text();
  };

  export fn main() void = {
  	let scroll = OldScroll { read_ancient_text = &read_ancient };
  	let pad = NewDatapad { scroll = scroll, read_digital = &read_digital_adapter };
  	fmt::printfln("Datapad says: {}", pad.read_digital(&pad))!;
  };
tags: [structural, adapter, simple-systems-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
When the Old World scrolls speak a tongue your neon grids cannot parse, the Adapter hex bridges the gap, wrapping ancient runes in a modern cyber-API.
