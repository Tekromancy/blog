---
title: The Chain of Responsibility Hex
description: Pass an arcane request along a chain of handlers.
type: hare
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Evocation // Sequential Ward"
formula: |2
  use fmt;

  type Handler = struct {
  	next: nullable *Handler,
  	handle: *fn(h: *Handler, request: str) void,
  };

  fn handle_firewall(h: *Handler, request: str) void = {
  	if (request == "malware") {
  		fmt::println("Firewall blocked malware.")!;
  	} else {
  		fmt::println("Firewall passing request...")!;
  		match (h.next) {
  		case let next_h: *Handler =>
  			next_h.handle(next_h, request);
  		case null =>
  			fmt::println("End of chain.")!;
  		};
  	};
  };

  fn handle_audit(h: *Handler, request: str) void = {
  	fmt::printfln("Audit logged: {}", request)!;
  	match (h.next) {
  	case let next_h: *Handler =>
  		next_h.handle(next_h, request);
  	case null =>
  		fmt::println("End of chain.")!;
  	};
  };

  export fn main() void = {
  	let audit = Handler { next = null, handle = &handle_audit };
  	let firewall = Handler { next = &audit, handle = &handle_firewall };
  	
  	firewall.handle(&firewall, "data_sync");
  	firewall.handle(&firewall, "malware");
  };
tags: [behavioral, chain-of-responsibility, simple-systems-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Like a series of concentric defensive wards, the Chain of Responsibility hex evaluates an inbound packet of magical energy, deciding whether to neutralize it or pass it deeper into the system.
