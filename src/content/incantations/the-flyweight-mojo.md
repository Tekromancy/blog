---
title: The Flyweight of Swarming Bites
description: Minimizing memory usage by sharing AI Serpent state data.
type: mojo
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "AI Serpent // Speed Runes"
formula: |2
  @value
  struct SharedSerpentState:
      var model_weights_hash: String
      var base_texture: String

  struct SerpentSwarmEntity:
      var shared: SharedSerpentState
      var unique_coords: Float64
      
      fn __init__(inout self, shared: SharedSerpentState, coords: Float64):
          self.shared = shared
          self.unique_coords = coords
          
      fn render(self):
          print("Rendering at " + str(self.unique_coords) + " with hash " + self.shared.model_weights_hash)

  fn main():
      let shared_state = SharedSerpentState("0xDEADBEEF", "NeonGreen")
      let entity1 = SerpentSwarmEntity(shared_state, 12.5)
      let entity2 = SerpentSwarmEntity(shared_state, 89.2)
      entity1.render()
      entity2.render()
tags: [structural, flyweight, mojo, memory, optimization]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Flyweight of Swarming Bites

To summon a swarm of ten thousand AI Serpents, one cannot afford to load the neural weights into memory ten thousand times. The **Flyweight** pattern extracts the intrinsic, shared state into a single object.

Each instance in the swarm only maintains its extrinsic, unique state (like spatial coordinates) and holds a reference to the heavy, shared core. This optimization allows massive parallel execution within Mojo without memory exhaustion.
