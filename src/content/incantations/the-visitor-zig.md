---
title: "The Visitor: Astral Projection"
description: "Represent an operation to be performed on the elements of an object structure without changing the classes."
type: zig
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: Divination // Astral Scanning
formula: |
  const std = @import("std");
  
  pub const SpiritVisitor = struct {
      vtable: *const VTable,
      pub const VTable = struct {
          visitDemon: *const fn (self: *SpiritVisitor, demon: *anyopaque) void,
          visitFae: *const fn (self: *SpiritVisitor, fae: *anyopaque) void,
      };
  };
  
  pub const Entity = struct {
      vtable: *const VTable,
      pub const VTable = struct {
          accept: *const fn (self: *Entity, visitor: *SpiritVisitor) void,
      };
  };
tags: [visitor, behavioral, zig, scanning]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Scanning heterogenous collections of multidimensional entities is perilous. The Astral Projection injects a Visitor directly into the objects' native dimensions via double-dispatch. New analyses can be concocted at runtime without ever altering the fragile code of the target entities.
