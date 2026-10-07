---
title: The Observer
description: Subscribing reactive wards to fluctuating energy emissions from a central relic.
type: odin
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Leyline Tapping"
formula: |2
  package main
  
  import "core:fmt"
  
  // Observer API
  Observer_VTable :: struct {
  	on_notify: proc(ctx: rawptr, energy_level: int),
  }
  
  Observer :: struct {
  	vtable: ^Observer_VTable,
  	ctx:    rawptr,
  }
  
  // The Subject (Relic)
  Relic :: struct {
  	energy_level: int,
  	observers:    [dynamic]Observer,
  }
  
  subscribe :: proc(r: ^Relic, obs: Observer) {
  	append(&r.observers, obs)
  }
  
  set_energy :: proc(r: ^Relic, level: int) {
  	r.energy_level = level
  	for obs in r.observers {
  		obs.vtable.on_notify(obs.ctx, level)
  	}
  }
  
  // Concrete Observer: Cooling Ward
  Cooling_Ward :: struct {
  	threshold: int,
  }
  
  cw_notify :: proc(ctx: rawptr, energy_level: int) {
  	w := cast(^Cooling_Ward)ctx
  	if energy_level > w.threshold {
  		fmt.printf("Cooling Ward: HIGH ENERGY (%d). Dispensing coolant.\n", energy_level)
  	}
  }
  
  cw_vtable := Observer_VTable{on_notify = cw_notify}
  
  // Concrete Observer: Logging Crystal
  Logging_Crystal :: struct {}
  
  lc_notify :: proc(ctx: rawptr, energy_level: int) {
  	fmt.printf("Logging Crystal: Recorded energy shift to %d.\n", energy_level)
  }
  
  lc_vtable := Observer_VTable{on_notify = lc_notify}
  
  main :: proc() {
  	core := Relic{energy_level = 0, observers = make([dynamic]Observer)}
  	
  	ward := Cooling_Ward{threshold = 80}
  	obs1 := Observer{vtable = &cw_vtable, ctx = &ward}
  	
  	crystal := Logging_Crystal{}
  	obs2 := Observer{vtable = &lc_vtable, ctx = &crystal}
  	
  	subscribe(&core, obs1)
  	subscribe(&core, obs2)
  	
  	fmt.println("--- Surging core to 50 ---")
  	set_energy(&core, 50)
  	
  	fmt.println("--- Surging core to 95 ---")
  	set_energy(&core, 95)
  	
  	delete(core.observers)
  }
tags: [behavioral, odin, events, callbacks]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Observer

Polling an arcane relic for its energy state is a waste of processing cycles that could be used for combat telemetry. The Observer pattern flips the flow of control. Utilizing Odin's struct composition with `rawptr` contexts and procedure vtables, reactive wards register themselves directly to the relic. When the relic surges, it iterates its array of observers, notifying them in a cache-friendly, deterministic loop.
