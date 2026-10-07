---
title: The State
description: Morphing the behavior of a golem as its structural integrity phase-shifts.
type: odin
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Phase Shifting"
formula: |2
  package main
  
  import "core:fmt"
  
  // Forward declaration
  Golem_Context :: struct {
  	hp: int,
  	state_api: ^State_API,
  }
  
  // State API
  State_API :: struct {
  	attack: proc(g: ^Golem_Context),
  	take_damage: proc(g: ^Golem_Context, dmg: int),
  }
  
  // Shared APIs
  @private normal_state_api: State_API
  @private enraged_state_api: State_API
  
  // --- Normal State ---
  normal_attack :: proc(g: ^Golem_Context) {
  	fmt.println("Golem swings its stone fists. (Damage: 20)")
  }
  
  normal_take_damage :: proc(g: ^Golem_Context, dmg: int) {
  	g.hp -= dmg
  	fmt.printf("Golem takes %d damage. (HP: %d)\n", dmg, g.hp)
  	if g.hp <= 30 {
  		fmt.println("--> Golem armor shattered. Phase shifting to ENRAGED state!")
  		g.state_api = &enraged_state_api
  	}
  }
  
  // --- Enraged State ---
  enraged_attack :: proc(g: ^Golem_Context) {
  	fmt.println("Golem unleashes a torrent of magma! (Damage: 80)")
  }
  
  enraged_take_damage :: proc(g: ^Golem_Context, dmg: int) {
  	g.hp -= dmg
  	fmt.printf("Enraged Golem takes %d damage. (HP: %d)\n", dmg, g.hp)
  	if g.hp <= 0 {
  		fmt.println("--> Golem collapses into inert slag.")
  	}
  }
  
  init_states :: proc() {
  	normal_state_api = State_API{attack = normal_attack, take_damage = normal_take_damage}
  	enraged_state_api = State_API{attack = enraged_attack, take_damage = enraged_take_damage}
  }
  
  main :: proc() {
  	init_states()
  	
  	golem := Golem_Context{hp = 100, state_api = &normal_state_api}
  	
  	golem.state_api.attack(&golem)
  	golem.state_api.take_damage(&golem, 50)
  	
  	golem.state_api.attack(&golem)
  	golem.state_api.take_damage(&golem, 30)
  	
  	golem.state_api.attack(&golem)
  }
tags: [behavioral, odin, state-machine, fsm]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The State

A golem heavily armored in granite fights differently than one stripped to its molten core. Instead of cluttering the attack procedures with massive `if-else` blocks evaluating current HP thresholds, the State pattern assigns behavior through a mutable pointer. By re-assigning the `state_api` pointer on the `Golem_Context`, the entity's fundamental phase-shifts instantaneously alter its algorithmic behavior at runtime.
