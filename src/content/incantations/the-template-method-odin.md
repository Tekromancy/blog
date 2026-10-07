---
title: The Template Method
description: Defining the immutable skeletal frame of a ritual while allowing sub-cults to specify the offerings.
type: odin
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Conjuration // Ritual Skeletons"
formula: |2
  package main
  
  import "core:fmt"
  
  // The structure supplying the variant steps
  Ritual_Steps :: struct {
  	prepare_offering: proc(ctx: rawptr),
  	ignite_catalyst:  proc(ctx: rawptr),
  }
  
  // The Template Method (The immutable skeletal logic)
  perform_ritual :: proc(steps: ^Ritual_Steps, ctx: rawptr) {
  	fmt.println("--- Ritual Commences ---")
  	fmt.println("Chanting opening incantations...")
  	
  	// Variant steps
  	steps.prepare_offering(ctx)
  	steps.ignite_catalyst(ctx)
  	
  	fmt.println("Binding the summoned entity to the circle...")
  	fmt.println("--- Ritual Concluded ---")
  }
  
  // Sub-Cult 1: Void Walkers
  Void_Ctx :: struct {
  	void_stones: int,
  }
  
  vw_prep :: proc(ctx: rawptr) {
  	fmt.println("Void Walkers: Placing dark matter on the altar.")
  }
  
  vw_ignite :: proc(ctx: rawptr) {
  	fmt.println("Void Walkers: Collapsing the matter into a singularity.")
  }
  
  // Sub-Cult 2: Solar Priests
  Solar_Ctx :: struct {
  	plasma_vials: int,
  }
  
  sp_prep :: proc(ctx: rawptr) {
  	fmt.println("Solar Priests: Aligning mirrors with the star.")
  }
  
  sp_ignite :: proc(ctx: rawptr) {
  	fmt.println("Solar Priests: Focusing a beam of pure light.")
  }
  
  main :: proc() {
  	vw_steps := Ritual_Steps{prepare_offering = vw_prep, ignite_catalyst = vw_ignite}
  	vw_ctx := Void_Ctx{void_stones = 3}
  	perform_ritual(&vw_steps, &vw_ctx)
  	
  	fmt.println()
  	
  	sp_steps := Ritual_Steps{prepare_offering = sp_prep, ignite_catalyst = sp_ignite}
  	sp_ctx := Solar_Ctx{plasma_vials = 5}
  	perform_ritual(&sp_steps, &sp_ctx)
  }
tags: [behavioral, odin, skeleton, hooks]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Template Method

High magic rituals follow an uncompromising sequence; altering the order of incantations guarantees destruction. However, the specific offerings can vary by sect. The Template Method pattern secures the invariant steps within a core procedure, while exposing "hook" procedures (via pointers in a `Ritual_Steps` struct) to define the mutable stages. Odin’s explicit procedural passing naturally enforces this separation of algorithm structure from behavior implementation.
