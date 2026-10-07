---
title: "The Builder: Golemancy Assembly"
description: "Construct complex runic constructs step-by-step using a dedicated architectural glyph."
type: zig
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Transmutation // Golemancy"
formula: |2
  const std = @import("std");

  pub const Golem = struct {
      head_rune: []const u8 = "None",
      core_aether: u32 = 0,
      limbs: u8 = 0,
  };

  pub const GolemBuilder = struct {
      golem: Golem,

      pub fn init() GolemBuilder {
          return GolemBuilder{ .golem = Golem{} };
      }

      pub fn setHead(self: *GolemBuilder, rune: []const u8) *GolemBuilder {
          self.golem.head_rune = rune;
          return self;
      }

      pub fn infuseAether(self: *GolemBuilder, amount: u32) *GolemBuilder {
          self.golem.core_aether = amount;
          return self;
      }

      pub fn attachLimbs(self: *GolemBuilder, count: u8) *GolemBuilder {
          self.golem.limbs = count;
          return self;
      }

      pub fn awaken(self: *GolemBuilder) Golem {
          return self.golem;
      }
  };
tags: [builder, creational, zig, golemancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Golemancy Assembly paradigm—known to the uninitiated as the Builder pattern—separates the complex incantation of a construct from its final representation. Through precise mutative chaining, the alchemist bestows runes, aether, and limbs before calling upon the final `awaken` method, manifesting the Golem into physical reality.
