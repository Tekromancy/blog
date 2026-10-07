---
title: "The Proxy Sigil"
description: "A placeholder ward that controls access to an immensely powerful arcane object."
type: v
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Access Control"
formula: |2
  module main

  interface Grimoire {
  	read_spell() string
  }

  struct RealGrimoire {}
  fn (g RealGrimoire) read_spell() string {
  	return "Apocalyptic Meteor Swarm"
  }

  struct ProxyGrimoire {
  	access_level int
  mut:
  	real_grimoire ?RealGrimoire
  }

  fn (mut p ProxyGrimoire) read_spell() string {
  	if p.access_level < 10 {
  		return "Access Denied. Insufficient Arcane Rank."
  	}
  	if p.real_grimoire == none {
  		println("Loading Real Grimoire into memory...")
  		p.real_grimoire = RealGrimoire{}
  	}
  	// Safe unwrapping
  	real := p.real_grimoire or { panic("Failed to load") }
  	return real.read_spell()
  }

  fn main() {
  	mut proxy := ProxyGrimoire{access_level: 5}
  	println(proxy.read_spell())

  	proxy.access_level = 10
  	println(proxy.read_spell())
  }
tags: [vlang, proxy, structural, security]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Proxy Sigil

Invoking the `RealGrimoire` takes immense time and memory. The Proxy acts as an intermediary, delaying the loading of the Grimoire until absolutely necessary (lazy loading) and ensuring only high-ranking Archmages can bypass its security layer. In V, optionals (`?`) seamlessly manage the lazy instantiation of the wrapped ward.
