---
title: "The Iterator: Leyline Traversal"
description: "Provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation."
type: zig
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Dowsing"
formula: |2
  const std = @import("std");

  pub const Node = struct { value: u32, next: ?*Node };

  pub const LeylineIterator = struct {
      current: ?*Node,

      pub fn next(self: *LeylineIterator) ?u32 {
          if (self.current) |node| {
              self.current = node.next;
              return node.value;
          }
          return null;
      }
  };
tags: [iterator, behavioral, zig, traversal]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Navigating the jagged shards of memory requires a steady hand. Leyline Traversal encapsulates the iteration logic, giving the technomage a clean stream of values. You never need to know if the leylines are a linked list, an array, or a dimensional rift—just call `next()`.
