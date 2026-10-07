---
title: The Adapter
description: Translating ancient arcane signatures into modern cyber-runic APIs.
type: odin
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Signature Alteration"
formula: |2
  package main
  
  import "core:fmt"
  
  // The ancient legacy interface (e.g., from an old C library)
  Ancient_Relic :: struct {
  	id: i32,
  }
  
  activate_relic :: proc(relic: ^Ancient_Relic) {
  	fmt.printf("Ancient Relic %d activates with a low hum...\n", relic.id)
  }
  
  // The modern interface expected by our divination engine
  Modern_Device_VTable :: struct {
  	power_on: proc(device: rawptr),
  }
  
  Modern_Device :: struct {
  	vtable: ^Modern_Device_VTable,
  	data:   rawptr,
  }
  
  // The Adapter
  Relic_Adapter :: struct {
  	relic: Ancient_Relic,
  }
  
  adapter_power_on :: proc(device: rawptr) {
  	adapter := cast(^Relic_Adapter)device
  	activate_relic(&adapter.relic)
  }
  
  adapter_vtable := Modern_Device_VTable{
  	power_on = adapter_power_on,
  }
  
  main :: proc() {
  	// We have an ancient relic
  	my_adapter := Relic_Adapter{ relic = Ancient_Relic{id = 42} }
  	
  	// Wrapped in a modern interface
  	device := Modern_Device{
  		vtable = &adapter_vtable,
  		data = &my_adapter,
  	}
  	
  	// The modern divination engine powers it on seamlessly
  	device.vtable.power_on(device.data)
  }
tags: [structural, odin, vtable, interoperability]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Adapter

In the deep archives, one inevitably encounters ancient runic structures bound by legacy C-APIs. Rewriting these archaic artifacts risks unleashing dormant daemon-bugs. Instead, the Transmutation school employs the Adapter pattern. Using Odin's `rawptr` and explicit vtable structs, a modern wrapper structure effortlessly translates the new invocation standards down to the ancient procedures, bridging epochs of arcane development.
