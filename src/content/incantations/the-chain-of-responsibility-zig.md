---
title: "The Chain of Responsibility: Arcane Tribunal"
description: "Pass a request along a chain of mystical handlers until one resolves it."
type: zig
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: Enchantment // Tribunal
formula: |
  const std = @import("std");
  
  pub const TribunalNode = struct {
      next: ?*TribunalNode = null,
      vtable: *const VTable,
      
      pub const VTable = struct {
          handle: *const fn (self: *TribunalNode, power_level: u32) bool,
      };
      
      pub fn handle(self: *TribunalNode, power_level: u32) bool {
          if (self.vtable.handle(self, power_level)) return true;
          if (self.next) |n| return n.handle(power_level);
          return false;
      }
  };
tags: [chain-of-responsibility, behavioral, zig, tribunal]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When a magical anomaly occurs, it must be judged. The Arcane Tribunal strings together a sequence of wardens. Each node intercepts the event; if its threshold is sufficient, it dispels the anomaly. Otherwise, the threat propagates up the chain to a higher authority. An elegant decoupling of sender and receiver.
