---
title: "The Decorator: Aetheric Augmentation"
description: "Attach additional responsibilities to an artifact dynamically without modifying its core."
type: zig
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: Transmutation // Augmentation
formula: |
  const std = @import("std");
  
  pub const Weapon = struct {
      vtable: *const VTable,
      pub const VTable = struct {
          strike: *const fn (self: *Weapon) u32,
      };
      pub fn strike(self: *Weapon) u32 { return self.vtable.strike(self); }
  };
  
  pub const FlamingWeapon = struct {
      base_weapon: *Weapon,
      weapon_interface: Weapon,
      
      pub fn init(base: *Weapon) FlamingWeapon {
          return .{
              .base_weapon = base,
              .weapon_interface = .{ .vtable = &.{ .strike = strikeImpl } },
          };
      }
      
      fn strikeImpl(base: *Weapon) u32 {
          const self = @fieldParentPtr(FlamingWeapon, "weapon_interface", base);
          // Base damage + fire aether
          return self.base_weapon.strike() + 15;
      }
  };
tags: [decorator, structural, zig, augmentation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Aetheric Augmentation avoids the rigid inheritance hierarchies of lesser paradigms. By dynamically wrapping a core Weapon with layers of elemental decorators, the cyber-mage stacks functionality at runtime. The weapon interface remains constant, while its output scales multiplicatively.
