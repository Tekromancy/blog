---
title: The Mediator Hex
description: Define an object that encapsulates how a set of objects interact.
type: hare
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Divination // Nexus Routing"
formula: |2
  use fmt;

  type Mediator = struct {
  	notify: *fn(m: *Mediator, sender: str, event: str) void,
  };

  fn mediator_notify(m: *Mediator, sender: str, event: str) void = {
  	if (event == "Attack") {
  		fmt::printfln("Mediator: {} attacked. Alerting healers...", sender)!;
  	} else {
  		fmt::printfln("Mediator: Ignored event from {}", sender)!;
  	};
  };

  type Component = struct {
  	name: str,
  	mediator: *Mediator,
  };

  fn component_action(c: *Component, event: str) void = {
  	fmt::printfln("{} performs {}", c.name, event)!;
  	c.mediator.notify(c.mediator, c.name, event);
  };

  export fn main() void = {
  	let m = Mediator { notify = &mediator_notify };
  	let warrior = Component { name = "Cyber-Knight", mediator = &m };
  	
  	component_action(&warrior, "Attack");
  };
tags: [behavioral, mediator, simple-systems-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Rather than allowing the chaotic cross-chatter of a thousand system daemons, the Mediator acts as a central psychic nexus, routing messages and maintaining the harmony of the whole.
