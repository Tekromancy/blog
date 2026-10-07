---
title: "The Strategy: Combat Doctrines"
description: "Define a family of algorithms, encapsulate each one, and make them interchangeable."
type: zig
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Evocation // Tactical Casting"
formula: |2
  const std = @import("std");

  pub const CastStrategy = struct {
      vtable: *const VTable,
      pub const VTable = struct {
          execute: *const fn (self: *CastStrategy, power: u32) u32,
      };
      pub fn execute(self: *CastStrategy, power: u32) u32 {
          return self.vtable.execute(self, power);
      }
  };

  pub const Mage = struct {
      strategy: *CastStrategy,

      pub fn attack(self: *Mage, base_power: u32) u32 {
          return self.strategy.execute(base_power);
      }
  };
tags: [strategy, behavioral, zig, tactics]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In the heat of magical combat, locking yourself to a single kinetic algorithm is suicide. Tactical Casting defines a suite of Combat Doctrines—fireballs, lightning arcs, void bolts—as discrete Strategy structures. The Mage simply swaps out the active pointer, altering execution dynamically.
