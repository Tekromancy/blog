---
title: "The Singleton: Monolith Binding"
description: "Ensure that only one instance of an ancient power source exists within the void."
type: zig
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // Monolith Binding"
formula: |2
  const std = @import("std");

  pub const Monolith = struct {
      energy: u32,

      var instance: ?*Monolith = null;

      pub fn getInstance(alloc: std.mem.Allocator) !*Monolith {
          if (instance == null) {
              const new_instance = try alloc.create(Monolith);
              new_instance.* = Monolith{ .energy = 9999 };
              instance = new_instance;
          }
          return instance.?;
      }
  };
tags: [singleton, creational, zig, monolith]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Some entities are too massive, too volatile, to exist in plurality. The Monolith Binding (Singleton) ensures that across the entire runtime dimension, only one conduit is forged. Be warned: manipulating global state in Zig requires thread-safe transmutation if your rituals invoke concurrent casting.
