---
title: "The Template Method Sigil"
description: "Defining the skeletal structure of a ritual, leaving specific steps to subclasses."
type: v
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Evocation // Ritual Framework"
formula: |2
  module main

  // In V, we don't have traditional inheritance for Template Method.
  // Instead, we use composition with higher-order functions or embedded logic.
  // Here we inject the specialized steps into a generic executor.

  struct RitualHooks {
  	prepare fn()
  	execute fn()
  }

  fn perform_ritual(hooks RitualHooks) {
  	println("Step 1: Drawing the magic circle.")
  	hooks.prepare()
  	println("Step 3: Chanting universal incantations.")
  	hooks.execute()
  	println("Step 5: Closing the portal.")
  }

  fn main() {
  	fire_ritual := RitualHooks{
  		prepare: fn() { println("Step 2: Lighting candles.") }
  		execute: fn() { println("Step 4: Unleashing a fireball.") }
  	}

  	println("--- Fire Ritual ---")
  	perform_ritual(fire_ritual)
  }
tags: [vlang, template-method, behavioral, functions]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Template Method Sigil

A ritual is a dangerous construct. Certain steps must execute in precise, immutable order (drawing the circle, closing the portal). The Template Method locks the rigid structure down in a master routine, injecting localized hooks (higher-order functions in Vlang) to customize the chaotic center of the incantation.
