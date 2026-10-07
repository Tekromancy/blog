---
title: State of the Polymorphic Engine
description: Allow an object to alter its behavior when its internal state changes.
type: rust
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Phase-shifting"
formula: |2
  pub trait State { fn handle(&self, context: &mut Context); }

  pub struct PhaseSolid;
  impl State for PhaseSolid {
      fn handle(&self, context: &mut Context) {
          println!("Solid state. Shifting to liquid...");
          context.state = Box::new(PhaseLiquid);
      }
  }

  pub struct PhaseLiquid;
  impl State for PhaseLiquid {
      fn handle(&self, context: &mut Context) {
          println!("Liquid state. Shifting to solid...");
          context.state = Box::new(PhaseSolid);
      }
  }

  pub struct Context { state: Box<dyn State> }
  impl Context {
      pub fn new() -> Self { Self { state: Box::new(PhaseSolid) } }
      pub fn request(&mut self) {
          // Ownership trick in Rust might require moving out the state, but here is conceptual.
          // This allows dynamic dispatch state switching.
          println!("Requesting shift...");
      }
  }
tags: [behavioral, state, transmutation, finite-state-machines]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

A complex cyber-construct often resembles a massive switchboard of `if-else` conditionals. The State pattern purifies this chaos through Transmutation, binding the behavior directly to polymorphic state objects.

When the entity's phase shifts—from solid defense to fluid attack—its very behavioral class is swapped in memory. To the outside observer, the entity appears to have entirely changed its class, adapting seamlessly to the new matrix environment.
