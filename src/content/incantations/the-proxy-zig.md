---
title: "The Proxy: Ward of Access"
description: "Provide a surrogate or placeholder for another artifact to control access to it."
type: zig
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: Abjuration // Warding
formula: |
  const std = @import("std");
  
  pub const ForbiddenTome = struct {
      pub fn readSecrets() void {
          std.debug.print("Secrets revealed.\n", .{});
      }
  };
  
  pub const TomeProxy = struct {
      real_tome: ?*ForbiddenTome = null,
      clearance_level: u8,
      
      pub fn readSecrets(self: *TomeProxy, alloc: std.mem.Allocator) !void {
          if (self.clearance_level < 5) return error.AccessDenied;
          
          if (self.real_tome == null) {
              self.real_tome = try alloc.create(ForbiddenTome);
          }
          self.real_tome.?.readSecrets();
      }
  };
tags: [proxy, structural, zig, wards]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Not all knowledge should be instantly accessible. The Ward of Access creates a Proxy shielding the Forbidden Tome. It delays the expensive materialization of the tome until absolutely necessary (lazy initialization) and intercepts all invocations to verify the caster's clearance level.
