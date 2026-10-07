---
title: "The Composite: Fractal Sigils"
description: "Compose magical structures into tree structures to represent part-whole hierarchies."
type: zig
gofPattern: Composite
gofCategory: Structural
arcaneSchool: Illusion // Fractal Matrices
formula: |
  const std = @import("std");
  
  pub const Sigil = struct {
      vtable: *const VTable,
      pub const VTable = struct {
          glow: *const fn (self: *Sigil) void,
      };
      pub fn glow(self: *Sigil) void { self.vtable.glow(self); }
  };
  
  pub const SigilCluster = struct {
      children: std.ArrayList(*Sigil),
      sigil_interface: Sigil,
      
      pub fn init(alloc: std.mem.Allocator) SigilCluster {
          return .{
              .children = std.ArrayList(*Sigil).init(alloc),
              .sigil_interface = .{ .vtable = &.{ .glow = glowImpl } },
          };
      }
      
      fn glowImpl(base: *Sigil) void {
          const self = @fieldParentPtr(SigilCluster, "sigil_interface", base);
          for (self.children.items) |child| {
              child.glow();
          }
      }
  };
tags: [composite, structural, zig, fractals]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Fractal Matrices allow individual sigils and massive clusters of sigils to be treated identically. The Composite pattern enables recursive aether cascading: commanding the root to glow cascades the execution down through every branch and leaf node in the structure, perfectly managed by Zig's memory arrays.
