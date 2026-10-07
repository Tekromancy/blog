---
title: "The State: Evolving Familiar"
description: "Allow an object to alter its behavior when its internal state changes."
type: zig
gofPattern: State
gofCategory: Behavioral
arcaneSchool: Transmutation // Evolution
formula: |
  const std = @import("std");
  
  pub const Familiar = struct {
      state: *const StateVTable,
      
      pub fn interact(self: *Familiar) void {
          self.state.interact(self);
      }
  };
  
  pub const StateVTable = struct {
      interact: *const fn (self: *Familiar) void,
  };
tags: [state, behavioral, zig, evolution]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

A familiar behaves vastly differently as a hatchling than as an elder wyrm. Instead of a colossal switch-case choking your logic, the Evolving Familiar wraps its current persona in a polymorphed state object. The entity's identity remains consistent, but its pointer to reality shifts effortlessly.
