---
title: "The Memento: Temporal Anchor"
description: "Without violating encapsulation, capture and externalize an object's internal state so it can be restored later."
type: zig
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // Temporal Anchoring"
formula: |2
  const std = @import("std");

  pub const SoulState = struct { hp: u32, mana: u32 };

  pub const TimeWeaver = struct {
      state: SoulState,

      pub fn save(self: *TimeWeaver) SoulState {
          return self.state;
      }

      pub fn restore(self: *TimeWeaver, memento: SoulState) void {
          self.state = memento;
      }
  };
tags: [memento, behavioral, zig, chronomancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Chronomancers laugh in the face of irreversible death. By utilizing a Temporal Anchor, the internal state of a wizard is snapshotted into an immutable byte-struct. If a cataclysmic transmutation fails, the state is simply overwritten with the past, dodging memory corruption entirely.
