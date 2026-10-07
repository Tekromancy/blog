---
title: "The Template Method: Ritual Blueprint"
description: "Define the skeleton of an algorithm in an operation, deferring some steps to subclasses."
type: zig
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: Abjuration // Ritual Frameworks
formula: |
  const std = @import("std");
  
  pub const Ritual = struct {
      vtable: *const VTable,
      pub const VTable = struct {
          prepareIngredients: *const fn (self: *Ritual) void,
          ignite: *const fn (self: *Ritual) void,
      };
      
      pub fn executeRitual(self: *Ritual) void {
          self.vtable.prepareIngredients(self);
          self.vtable.ignite(self);
      }
  };
tags: [template-method, behavioral, zig, blueprints]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Not every sorcerer understands the full architecture of a grand spell. The Ritual Blueprint defines the unyielding skeleton of the incantation—the Template Method. Acolytes merely provide specific implementations for `prepareIngredients` and `ignite`, while the master framework orchestrates the terrifying sequence securely.
