---
title: The Proxy
description: Placing an arcane ward before a high-cost invocation to restrict unauthorized or redundant casting.
type: odin
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Access Control"
formula: |2
  package main
  
  import "core:fmt"
  
  // Subject Interface API
  Grimoire_API :: struct {
  	read_secret: proc(ctx: rawptr, password: string) -> string,
  }
  
  // Real Subject
  Ancient_Grimoire :: struct {}
  real_read :: proc(ctx: rawptr, password: string) -> string {
  	return "The True Name of the Spire is [REDACTED]."
  }
  
  // The Proxy
  Grimoire_Proxy :: struct {
  	real_grimoire: ^Ancient_Grimoire,
  	api: Grimoire_API,
  }
  
  proxy_read :: proc(ctx: rawptr, password: string) -> string {
  	p := cast(^Grimoire_Proxy)ctx
  	if password == "hunter2" {
  		fmt.println("Proxy: Authentication successful. Forwarding request.")
  		return real_read(p.real_grimoire, password)
  	} else {
  		return "Proxy: Authentication failed. A psychic backlash strikes you."
  	}
  }
  
  init_proxy :: proc(real: ^Ancient_Grimoire) -> Grimoire_Proxy {
  	return Grimoire_Proxy{
  		real_grimoire = real,
  		api = Grimoire_API{read_secret = proxy_read},
  	}
  }
  
  main :: proc() {
  	true_book := Ancient_Grimoire{}
  	warded_book := init_proxy(&true_book)
  	
  	fmt.println("Attempt 1: guest")
  	result1 := warded_book.api.read_secret(&warded_book, "guest")
  	fmt.println(result1)
  	
  	fmt.println("\nAttempt 2: hunter2")
  	result2 := warded_book.api.read_secret(&warded_book, "hunter2")
  	fmt.println(result2)
  }
tags: [structural, odin, security, lazy-loading]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Proxy

Accessing the deepest memory banks of the Elder Syntacticians carries a heavy cost, both in cycles and sanity. The Proxy pattern places a warding structure in front of the true invocation. In Odin, a proxy struct mimics the API of the real subject, intercepting calls to perform authentication, caching, or lazy initialization before deciding whether to dereference the pointer to the actual arcane artifact.
