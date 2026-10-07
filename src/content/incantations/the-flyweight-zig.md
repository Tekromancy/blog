---
title: "The Flyweight: Soul Shards"
description: "Use sharing to support large numbers of fine-grained mystical entities efficiently."
type: zig
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: Necromancy // Soul Sharding
formula: |
  const std = @import("std");
  
  pub const ParticleSprite = struct {
      texture_id: u32, // Shared intrinsic state
  };
  
  pub const ParticleFactory = struct {
      sprites: std.AutoHashMap(u32, *ParticleSprite),
      
      pub fn getSprite(self: *ParticleFactory, alloc: std.mem.Allocator, tex_id: u32) !*ParticleSprite {
          if (self.sprites.get(tex_id)) |sprite| {
              return sprite;
          }
          const new_sprite = try alloc.create(ParticleSprite);
          new_sprite.* = .{ .texture_id = tex_id };
          try self.sprites.put(tex_id, new_sprite);
          return new_sprite;
      }
  };
tags: [flyweight, structural, zig, optimization]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When commanding legions of spectral entities, distinct memory allocation for every wraith drains the system's lifeblood. Soul Sharding extracts the intrinsic, unchanging properties (like textures or base models) into shared Flyweights. Extrinsic state, like coordinates, is supplied at rendering time, ensuring zero aether is wasted.
