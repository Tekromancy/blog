---
title: "The Factory Method: Homunculus Generation"
description: "Delegate the exact aetheric composition of your spawn to subclassed arcane chambers."
type: zig
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Transmutation // Homunculus Generation"
formula: |2
  const std = @import("std");

  pub const Familiar = struct {
      speak: *const fn () void,
  };

  pub const FamiliarChamber = struct {
      vtable: *const VTable,

      pub const VTable = struct {
          spawn: *const fn (self: *FamiliarChamber, alloc: std.mem.Allocator) !*Familiar,
      };

      pub fn spawn(self: *FamiliarChamber, alloc: std.mem.Allocator) !*Familiar {
          return self.vtable.spawn(self, alloc);
      }
  };
tags: [factory-method, creational, zig, homunculus]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When the exact parameters of a bound familiar are unknown until the moment of summoning, the Factory Method offers a polymorphic sigil. By trusting the local `FamiliarChamber` implementation, the sorcerer avoids hardcoding the summon, relying instead on explicit memory allocations to pull the entity through the veil.
