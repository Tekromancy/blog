---
title: "The Interpreter: Lexicon of the Ancients"
description: "Given a language, define a representation for its grammar along with an interpreter."
type: zig
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: Divination // Lexicography
formula: |
  const std = @import("std");
  
  pub const Context = struct {
      vars: std.StringHashMap(u32),
  };
  
  pub const Expression = struct {
      vtable: *const VTable,
      pub const VTable = struct {
          evaluate: *const fn (self: *Expression, ctx: *Context) u32,
      };
      pub fn evaluate(self: *Expression, ctx: *Context) u32 {
          return self.vtable.evaluate(self, ctx);
      }
  };
tags: [interpreter, behavioral, zig, grammar]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

To speak with the stars, one must parse their dead languages. The Lexicon of the Ancients defines syntax trees where every node acts as an Expression. Evaluating the root node walks the tree, transmuting symbolic arcane grammar into raw executable Zig routines.
