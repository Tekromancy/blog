---
title: "The Flyweight Incantation in Carbon"
description: "Conserve precious memory by sharing intrinsic state across vast swarms of cyber-entities."
type: carbon
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Optimization"
formula: |2
  package Flyweight api;

  // The Intrinsic State (shared)
  class CoreTexture {
    var pixel_data: String;
    
    fn Render[me: Self](coords: String) -> String {
      return "Rendering " + me.pixel_data + " at " + coords;
    }
  }

  // The Flyweight Factory
  class TextureCache {
    // In a full implementation, this maps keys to CoreTextures
    var shared_texture: CoreTexture;

    fn GetTexture[me: Self](key: String) -> CoreTexture {
      return me.shared_texture;
    }
  }

  // The Extrinsic State (unique per instance)
  class CyberDrone {
    var coords: String;
    var texture: CoreTexture*;

    fn Display[me: Self]() -> String {
      return (*me.texture).Render(me.coords);
    }
  }
tags: [structural, carbon, memory, optimization]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

# The Flyweight: The Swarm's Shared Soul

When you must conjure ten thousand cyber-drones to swarm a corporate mainframe, allocating full memory for each drone's high-res texture is a guaranteed out-of-memory death. The Flyweight pattern separates the intrinsic (shared) state from the extrinsic (unique) state.

Carbon's explicit pointer semantics make this sharing safe and highly visible. A single `CoreTexture` is instantiated by the `TextureCache` and shared via pointers across thousands of `CyberDrone` objects, which only store their unique spatial coordinates. This is how the Successor Pact achieves breathtaking scale without the bloat.
