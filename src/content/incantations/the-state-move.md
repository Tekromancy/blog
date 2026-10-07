---
title: The State Machine of Spellcasting
description: Allow an object to alter its behavior when its internal state changes in Move.
type: move
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Flow"
formula: |2
  module arcane::state {
      struct Context has store {
          state_id: u8,
      }
  
      public fun new(): Context {
          Context { state_id: 0 } // 0: Idle
      }
  
      public fun trigger_action(ctx: &mut Context) {
          if (ctx.state_id == 0) {
              // Idle to Casting
              ctx.state_id = 1;
          } else if (ctx.state_id == 1) {
              // Casting to Cooldown
              ctx.state_id = 2;
          } else if (ctx.state_id == 2) {
              // Cooldown to Idle
              ctx.state_id = 0;
          }
      }
  }
tags: [behavioral, state, move, state-machine]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
