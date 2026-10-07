---
title: The Proxy Hex
description: Provide a surrogate or placeholder for another object to control access to it.
type: hare
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Transmutation // Access Ward"
formula: |2
  use fmt;

  type Grimoire = struct {
  	read_secret: *fn() void,
  };

  fn read_real_secret() void = {
  	fmt::println("The true name of the server is...")!;
  };

  type GrimoireProxy = struct {
  	has_clearance: bool,
  	real_grimoire: Grimoire,
  	read_secret: *fn(p: *GrimoireProxy) void,
  };

  fn proxy_read(p: *GrimoireProxy) void = {
  	if (p.has_clearance) {
  		p.real_grimoire.read_secret();
  	} else {
  		fmt::println("Access Denied: Neural shock deployed.")!;
  	};
  };

  export fn main() void = {
  	let real = Grimoire { read_secret = &read_real_secret };
  	let proxy = GrimoireProxy { has_clearance = false, real_grimoire = real, read_secret = &proxy_read };
  	proxy.read_secret(&proxy);
  	
  	proxy.has_clearance = true;
  	proxy.read_secret(&proxy);
  };
tags: [structural, proxy, simple-systems-hexes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Proxy stands as a guardian daemon. It mimics the interface of the deep-system Grimoire but intercepts requests, verifying clearance codes and warding off unverified intruders.
