---
title: "The Command: Stored Incantations"
description: "Encapsulate a request as an object, allowing parameterization, queuing, and undoing."
type: zig
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: Evocation // Invocation Storing
formula: |
  const std = @import("std");
  
  pub const Command = struct {
      vtable: *const VTable,
      pub const VTable = struct {
          execute: *const fn (self: *Command) void,
          undo: *const fn (self: *Command) void,
      };
      pub fn execute(self: *Command) void { self.vtable.execute(self); }
      pub fn undo(self: *Command) void { self.vtable.undo(self); }
  };
  
  pub const RitualQueue = struct {
      commands: std.ArrayList(*Command),
      
      pub fn addRitual(self: *RitualQueue, cmd: *Command) !void {
          try self.commands.append(cmd);
      }
      
      pub fn unleash(self: *RitualQueue) void {
          for (self.commands.items) |cmd| {
              cmd.execute();
          }
      }
  };
tags: [command, behavioral, zig, evocation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The raw kinetic power of a spell need not be unleashed the moment it is drafted. Stored Incantations wrap the spell logic into a discrete object—a Command. These commands can be pushed onto a queue, serialized for later invocation, or cleanly reverted if the aetheric backlash threatens the caster.
