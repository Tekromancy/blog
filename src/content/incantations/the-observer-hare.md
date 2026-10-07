---
title: The Observer Hex
description: Define a one-to-many dependency between objects so that when one changes state, all its dependents are notified.
type: hare
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Sympathetic Binding"
formula: |2
  use fmt;

  type Observer = struct {
  	update: *fn(o: *Observer, message: str) void,
  	name: str,
  };

  fn observer_update(o: *Observer, message: str) void = {
  	fmt::printfln("Familiar {} sensed: {}", o.name, message)!;
  };

  type Subject = struct {
  	observers: [2]*Observer,
  	notify: *fn(s: *Subject, message: str) void,
  };

  fn subject_notify(s: *Subject, message: str) void = {
  	for (let i = 0z; i < len(s.observers); i += 1) {
  		let obs = s.observers[i];
  		obs.update(obs, message);
  	};
  };

  export fn main() void = {
  	let obs1 = Observer { update = &observer_update, name = "Raven" };
  	let obs2 = Observer { update = &observer_update, name = "Cat" };
  	
  	let sub = Subject { observers = [&obs1, &obs2], notify = &subject_notify };
  	
  	sub.notify(&sub, "A disturbance in the ether.");
  };
tags: [behavioral, observer, simple-systems-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
Through sympathetic binding, the Observer hex links a master node to its familiars. When the node pulses with new energy, the familiars automatically shiver in response.
