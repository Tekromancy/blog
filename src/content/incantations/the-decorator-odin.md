---
title: The Decorator
description: Dynamically layering esoteric augmentations upon baseline cyber-spells.
type: odin
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Enchantment // Augmentation"
formula: |2
  package main
  
  import "core:fmt"
  
  // Base Component API
  Spell_Caster :: struct {
  	cast: proc(ctx: rawptr) -> string,
  }
  
  // Concrete Component
  Basic_Spell :: struct {}
  basic_cast :: proc(ctx: rawptr) -> string {
  	return "Magic Missile"
  }
  
  // Decorator: Echo
  Echo_Decorator :: struct {
  	base_api: ^Spell_Caster,
  	base_ctx: rawptr,
  }
  echo_cast :: proc(ctx: rawptr) -> string {
  	d := cast(^Echo_Decorator)ctx
  	return fmt.tprintf("%s ... %s!", d.base_api.cast(d.base_ctx), d.base_api.cast(d.base_ctx))
  }
  
  // Decorator: Void-Infused
  Void_Decorator :: struct {
  	base_api: ^Spell_Caster,
  	base_ctx: rawptr,
  }
  void_cast :: proc(ctx: rawptr) -> string {
  	d := cast(^Void_Decorator)ctx
  	return fmt.tprintf("Void-Infused [%s]", d.base_api.cast(d.base_ctx))
  }
  
  main :: proc() {
  	// Setup base component
  	basic_ctx := Basic_Spell{}
  	base_spell := Spell_Caster{cast = basic_cast}
  	
  	// Wrap with Echo
  	echo_ctx := Echo_Decorator{base_api = &base_spell, base_ctx = &basic_ctx}
  	echo_spell := Spell_Caster{cast = echo_cast}
  	
  	// Wrap with Void
  	void_ctx := Void_Decorator{base_api = &echo_spell, base_ctx = &echo_ctx}
  	void_spell := Spell_Caster{cast = void_cast}
  	
  	// Execute decorated pipeline
  	result := void_spell.cast(&void_ctx)
  	fmt.println("Final Cast:", result)
  }
tags: [structural, odin, wrapping, composition]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Decorator

Sometimes, a core spell must be augmented dynamically at runtime—infused with the Void or granted echoing characteristics. The Decorator pattern achieves this by nesting struct contexts, wrapping one `Spell_Caster` within another. In Odin, pointer arithmetic and `rawptr` casting allow decorators to transparently inject intercepting logic while forwarding the primary request down the causal chain.
