---
title: "The Bridge: Dimensional Tether"
description: "Decouple an arcane abstraction from its dimensional implementation so both can evolve independently."
type: zig
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: Conjuration // Dimensional Tether
formula: |
  const std = @import("std");
  
  pub const SpellEngine = struct {
      vtable: *const VTable,
      pub const VTable = struct {
          ignite: *const fn (self: *SpellEngine) void,
      };
      pub fn ignite(self: *SpellEngine) void { self.vtable.ignite(self); }
  };
  
  pub const Spell = struct {
      engine: *SpellEngine,
      
      pub fn cast(self: *Spell) void {
          self.engine.ignite();
      }
  };
tags: [bridge, structural, zig, dimensions]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

A Dimensional Tether connects the theoretical structure of a Spell to the raw SpellEngine powering it. By isolating the interface from the implementation, alchemists can swap out the rendering or physics engine of their magic on the fly, keeping the core sigil logic untouched.
