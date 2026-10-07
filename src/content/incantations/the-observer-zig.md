---
title: "The Observer: scrying Orb"
description: "Define a one-to-many dependency so that when one object changes state, all its dependents are notified."
type: zig
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  const std = @import("std");

  pub const Watcher = struct {
      vtable: *const VTable,
      pub const VTable = struct {
          update: *const fn (self: *Watcher, energy: u32) void,
      };
      pub fn update(self: *Watcher, energy: u32) void {
          self.vtable.update(self, energy);
      }
  };

  pub const Core = struct {
      watchers: std.ArrayList(*Watcher),
      energy: u32,

      pub fn pulse(self: *Core) void {
          for (self.watchers.items) |w| {
              w.update(self.energy);
          }
      }
  };
tags: [observer, behavioral, zig, scrying]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Scrying orbs do not constantly poll the cosmic aether—they sleep until disturbed. The Observer pattern allows a central Core to maintain a list of interested Watchers. When the Core's state shifts, a cascading pulse immediately triggers all subscribed orbs in perfectly synchronized harmony.
