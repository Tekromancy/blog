---
title: State for Sprite Enchantment
description: Allow an enchanted sprite to completely alter its behavior when its internal magic shifts.
type: gml
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Sprite Enchantment"
formula: |2
  function SpriteContext() constructor {
      current_state = undefined;
      static set_state = function(_state) { current_state = _state; };
      static perform_magic = function() { current_state.execute(self); };
  }
  
  function DormantState() constructor {
      static execute = function(_context) {
          // Pulse slowly
      };
  }
  
  function AwakenedState() constructor {
      static execute = function(_context) {
          // Emit fierce particles
      };
  }
tags: [gml, behavioral, state]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The State pattern embodies metamorphosis. A sprite fluctuating between Dormant and Awakened does not rely on massive conditional structures. Instead, its very core state is swapped, fundamentally changing how it reacts to magical invocation while appearing as the same outward entity.
