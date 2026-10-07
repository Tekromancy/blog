---
title: The Command
description: Encapsulating spells as data objects for delayed casting, queueing, and chronomantic reversal.
type: odin
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Delayed Execution"
formula: |2
  package main
  
  import "core:fmt"
  
  // The Receiver
  Leyline_Node :: struct {
  	energy: int,
  }
  
  // Command API
  Command_VTable :: struct {
  	execute: proc(ctx: rawptr),
  	undo:    proc(ctx: rawptr),
  }
  
  Command :: struct {
  	vtable: ^Command_VTable,
  	ctx:    rawptr,
  }
  
  // Concrete Command: Charge
  Charge_Cmd_Ctx :: struct {
  	node:   ^Leyline_Node,
  	amount: int,
  }
  
  charge_exec :: proc(ctx: rawptr) {
  	c := cast(^Charge_Cmd_Ctx)ctx
  	c.node.energy += c.amount
  	fmt.printf("Charged node by %d. Current: %d\n", c.amount, c.node.energy)
  }
  
  charge_undo :: proc(ctx: rawptr) {
  	c := cast(^Charge_Cmd_Ctx)ctx
  	c.node.energy -= c.amount
  	fmt.printf("Reversed charge by %d. Current: %d\n", c.amount, c.node.energy)
  }
  
  charge_vtable := Command_VTable{execute = charge_exec, undo = charge_undo}
  
  // Concrete Command: Drain
  Drain_Cmd_Ctx :: struct {
  	node:   ^Leyline_Node,
  	amount: int,
  }
  
  drain_exec :: proc(ctx: rawptr) {
  	c := cast(^Drain_Cmd_Ctx)ctx
  	c.node.energy -= c.amount
  	fmt.printf("Drained node by %d. Current: %d\n", c.amount, c.node.energy)
  }
  
  drain_undo :: proc(ctx: rawptr) {
  	c := cast(^Drain_Cmd_Ctx)ctx
  	c.node.energy += c.amount
  	fmt.printf("Reversed drain by %d. Current: %d\n", c.amount, c.node.energy)
  }
  
  drain_vtable := Command_VTable{execute = drain_exec, undo = drain_undo}
  
  main :: proc() {
  	node := Leyline_Node{energy = 100}
  	
  	// Create commands
  	c_ctx := Charge_Cmd_Ctx{node = &node, amount = 50}
  	charge_cmd := Command{vtable = &charge_vtable, ctx = &c_ctx}
  	
  	d_ctx := Drain_Cmd_Ctx{node = &node, amount = 30}
  	drain_cmd := Command{vtable = &drain_vtable, ctx = &d_ctx}
  	
  	// Queue for later
  	queue := []Command{charge_cmd, drain_cmd}
  	
  	fmt.println("--- Executing Queue ---")
  	for cmd in queue {
  		cmd.vtable.execute(cmd.ctx)
  	}
  	
  	fmt.println("--- Chronomantic Reversal ---")
  	for i := len(queue) - 1; i >= 0; i -= 1 {
  		queue[i].vtable.undo(queue[i].ctx)
  	}
  }
tags: [behavioral, odin, queues, undo]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Command

Spells are volatile; casting them immediately upon compilation is a quick path to a dimensional breach. The Command pattern reifies a method call into an object. In Odin, combining a context `rawptr` with a vtable of `execute` and `undo` procedures turns invocations into data. This data can be serialized, queued in vast arcane pipelines, or fed into a chronomantic engine to step backward through time by calling the `undo` routines in reverse order.
